import {logger} from "firebase-functions";
import * as functions from "firebase-functions/v1";
import {getFirestore} from "firebase-admin/firestore";
import {
  generateRandomAvatarFileName,
  generateRandomKatakanaName,
} from "../utils";

const db = getFirestore();

export const createUserDocument = functions
  .region("asia-northeast1")
  .auth
  .user()
  .onCreate(async (user) => {
    try {
      const userDoc = {
        id: user.uid,
        authenticationId: user.uid,
        displayName: user.displayName || generateRandomKatakanaName(),
        avatarFileName: generateRandomAvatarFileName(),
        createdAt: new Date().toISOString(),
        deletedAt: null,
        isDeleted: false,
        bio: "未設定",
      };

      await db.collection("users").doc(user.uid).set(userDoc);
      logger.info(`ユーザー作成: ${user.uid}`);
    } catch (error) {
      logger.error("Firestoreへの書き込みエラー:", error);
    }
  });
