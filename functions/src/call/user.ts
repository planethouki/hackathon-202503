import {onCall, HttpsError} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {Profile} from "./interfaces";
import {defineSecret} from "firebase-functions/params";

const db = getFirestore();
const privateKey = defineSecret("ETH_PRIVATE_KEY");

export const setProfile = onCall<Profile>({
  cors: true,
}, async (request) => {
  const uid = request.auth?.uid;

  if (uid === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }
  const uRef = db.doc(`users/${uid}`);
  const uSnap = await uRef.get();

  if (!uSnap.exists) {
    throw new HttpsError("not-found", "対象のデータが見つかりません");
  }

  const profile = request.data;
  await uRef.set(profile, {merge: true});

  return {
    success: true,
    message: "Profile updated successfully",
  };
});

export const getPunchlinesPaginated = onCall<{ page: number }>({
  cors: true,
  secrets: [privateKey],
}, async (request) => {
  const userId = request.auth?.uid;

  if (userId === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }
  const uRef = db.doc(`users/${userId}`);
  const uSnap = await uRef.get();

  if (!uSnap.exists) {
    throw new HttpsError("not-found", "対象のデータが見つかりません");
  }

  const {page} = request.data;

  const punchlines = await db
    .collection("punchlines")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .offset(20 * (page - 1))
    .limit(20)
    .get()
    .then((snap) => snap.docs
      .map((doc) => doc.data()));

  const {count} = await db
    .collection("punchlines")
    .where("userId", "==", userId)
    .count()
    .get()
    .then((snap) => snap.data());

  return {
    success: true,
    punchlines,
    totalPunchlines: count,
  };
});

export const getPollsPaginated = onCall<{ page: number }>({
  cors: true,
  secrets: [privateKey],
}, async (request) => {
  const userId = request.auth?.uid;

  if (userId === undefined) {
    throw new HttpsError("permission-denied", "ログインが必要です");
  }

  const {page} = request.data;

  const polls = await db
    .collection("polls")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .offset(20 * (page - 1))
    .limit(20)
    .get()
    .then((c) => {
      return c.docs.map((doc) => doc.data());
    });

  const {count} = await db
    .collection("polls")
    .where("userId", "==", userId)
    .count()
    .get()
    .then((snap) => snap.data());

  return {
    success: true,
    polls,
    totalPolls: count,
  };
});
