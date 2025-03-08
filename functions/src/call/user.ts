import {onCall, HttpsError} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";
import {Profile} from "./interfaces";

const db = getFirestore();

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
