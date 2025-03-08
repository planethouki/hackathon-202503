import {onCall, HttpsError} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {Poll} from "./interfaces";
import {generateRandomString} from "../utils";

const db = getFirestore();

export const createPoll = onCall<Poll>({
  cors: true,
}, async (request) => {
  const poll = request.data;
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "uid not found");
  }
  const pRef = db.doc(`punchlines/${poll.punchlineId}`);
  const pSnap = await pRef.get();

  if (!pSnap.exists) {
    throw new HttpsError("not-found", "punchline not found");
  }

  const pollId = generateRandomString();
  await pRef.collection("polls").doc(pollId).set({
    id: pollId,
    createdAt: new Date().toISOString(),
    userId: uid,
    emoji: poll.emoji,
  });

  return {
    success: true,
    message: "Poll added successfully",
  };
});

