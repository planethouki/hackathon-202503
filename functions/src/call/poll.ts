import {onCall, HttpsError} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {Poll} from "./interfaces";
import {generateRandomString} from "../utils";
import {defineSecret} from "firebase-functions/params";
import {logger} from "firebase-functions";
import {calcAddress, mintPollToken} from "../ethUtils";

const db = getFirestore();
const privateKey = defineSecret("ETH_PRIVATE_KEY");

export const createPoll = onCall<Poll>({
  cors: true,
  secrets: [privateKey],
}, async (request) => {
  const poll = request.data;
  const punchlineId = poll.punchlineId;
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }
  const pRef = db.doc(`punchlines/${punchlineId}`);
  const pSnap = await pRef.get();

  if (!pSnap.exists) {
    throw new HttpsError("not-found", "対象のデータが見つかりません");
  }

  const userPollCountSnap = await db
    .collection("polls")
    .where("userId", "==", uid)
    .where("punchlineId", "==", punchlineId)
    .limit(1)
    .count()
    .get();

  if (userPollCountSnap.data().count !== 0) {
    throw new HttpsError("already-exists", "既に投票済みです");
  }

  const pollId = generateRandomString();
  await db.collection("polls").doc(pollId).set({
    id: pollId,
    createdAt: new Date().toISOString(),
    userId: uid,
    emoji: poll.emoji,
    punchlineId,
  });

  // ETHに書き込む
  logger.info("New poll created; Minting PollToken.");
  const id = generateRandomString();
  const result = await mintPollToken(calcAddress(punchlineId));
  await db.collection("transactions").doc(id).set({
    id,
    userId: uid,
    pollId,
    punchlineId,
    hash: result.hash,
    from: result.from,
    to: result.to,
    recipient: result.recipient,
    type: "mintPollToken",
    createdAt: new Date().toISOString(),
  });

  return {
    success: true,
    message: "Poll added successfully",
  };
});

export const getPolls = onCall<{punchlineId: string}>({
  cors: true,
}, async (request) => {
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }

  const {punchlineId} = request.data;

  if (!punchlineId) {
    throw new HttpsError("permission-denied", "対象のデータが見つかりませんでした");
  }

  const pSnap = await db
    .collection("polls")
    .where("userId", "==", uid)
    .where("punchlineId", "==", punchlineId)
    .get();

  const polls = pSnap
    .docs
    .map((doc) => doc.data())
    .sort((a, b) => a.createdAt - b.createdAt);

  return {
    success: true,
    message: `Retrieved ${polls.length} poll(s) successfully`,
    polls,
    alreadyPolled: polls.length > 0,
  };
});
