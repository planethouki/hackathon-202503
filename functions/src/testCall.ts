import {onCall} from "firebase-functions/v2/https";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

export const createPunchline = onCall({
  cors: true,
}, async (request) => {
  await db.collection("debris").add({
    createdAt: new Date(),
    message: "hello world!",
  });

  return {
    success: true,
  };
});

