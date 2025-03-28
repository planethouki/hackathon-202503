import {onCall, HttpsError} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {Punchline} from "./interfaces";
import {generateRandomString} from "../utils";
import {logger} from "firebase-functions";
import {mintPunchlineToken} from "../ethUtils";
import {defineSecret} from "firebase-functions/params";

const db = getFirestore();
const privateKey = defineSecret("ETH_PRIVATE_KEY");

export const createPunchline = onCall<Punchline>({
  cors: true,
  secrets: [privateKey],
}, async (request) => {
  const punchline = request.data;
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }

  const punchlineId = generateRandomString();

  await db.collection("punchlines").doc(punchlineId).set({
    id: punchlineId,
    createdAt: new Date().toISOString(),
    userId: uid,
    pollCount: 0,
    rankingInContest: 0,
    ...punchline,
  });

  // ETHに書き込む
  logger.info("New punchline created; minting PunchlineToken.");
  const txId = generateRandomString();
  const result = await mintPunchlineToken(punchlineId);
  await db.collection("transactions").doc(txId).set({
    id: txId,
    userId: uid,
    punchlineId,
    hash: result.hash,
    from: result.from,
    to: result.to,
    tokenId: result.tokenId,
    tokenIdDec: result.tokenIdDec,
    type: "mintPunchlineToken",
    createdAt: new Date().toISOString(),
  });

  await db.collection("punchlines").doc(punchlineId).update({
    tokenId: result.tokenId,
    tokenIdDec: result.tokenIdDec,
  });

  return {
    success: true,
    message: "Punchline added successfully",
  };
});

