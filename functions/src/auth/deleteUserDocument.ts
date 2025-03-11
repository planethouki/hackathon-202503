import {logger} from "firebase-functions";
import * as functions from "firebase-functions/v1";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

export const deleteUserDocument = functions
  .region("asia-northeast1")
  .auth
  .user()
  .onDelete(async (user) => {
    try {
      const userDoc = {
        deletedAt: new Date().toISOString(),
        isDeleted: true,
      };

      await db.collection("users").doc(user.uid).set(userDoc, {merge: true});
      logger.info(`ユーザー削除: ${user.uid}`);
    } catch (error) {
      logger.error("Firestoreへの書き込みエラー:", error);
    }
  });
