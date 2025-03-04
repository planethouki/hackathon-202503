import {onCall, HttpsError} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {Punchline} from "./interfaces";
import {generateRandomString} from "../utils";

const db = getFirestore();

export const createPunchline = onCall<Punchline>({
  cors: true,
}, async (request) => {
  const punchline = request.data;
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "uid not found");
  }

  const id = generateRandomString();

  await db.collection("punchlines").doc(id).set({
    id,
    createdAt: new Date().toISOString(),
    userId: uid,
    ...punchline,
  });

  return {
    success: true,
    message: "Punchline added successfully",
  };
});

