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
    throw new HttpsError("permission-denied", "ログインが必要です");
  }
  const pRef = db.doc(`punchlines/${poll.punchlineId}`);
  const pSnap = await pRef.get();

  if (!pSnap.exists) {
    throw new HttpsError("not-found", "対象のデータが見つかりません");
  }

  const userPollCountSnap = await pRef
    .collection("polls")
    .where("userId", "==", uid)
    .limit(1)
    .count()
    .get();

  if (userPollCountSnap.data().count !== 0) {
    throw new HttpsError("already-exists", "既に投票済みです");
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

