import {
  onDocumentCreated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {logger} from "firebase-functions";
import updateRanking from "./lib/updateRanking";

const db = getFirestore();

export const onPollCreated = onDocumentCreated(
  "polls/{pollId}",
  async (event) => {
    if (!event.data) {
      logger.warn("Poll data was not created");
      return;
    }
    const punchlineId = event.data.data().punchlineId as string;
    await common(punchlineId);
  }
);

export const onPollDeleted = onDocumentDeleted(
  "polls/{pollId}",
  async (event) => {
    if (!event.data) {
      logger.warn("Poll data was not found");
      return;
    }
    const punchlineId = event.data.data().punchlineId as string;
    await common(punchlineId);
  }
);

const common = async (punchlineId: string) => {
  // 投票数更新
  const {count} = await db
    .collection("polls")
    .where("punchlineId", "==", punchlineId)
    .count()
    .get()
    .then((q) => q.data());

  const pRef = db.doc(`punchlines/${punchlineId}`);
  const pSnap = await pRef.get();
  const punchline = pSnap.data();

  if (!pSnap.exists || !punchline) {
    logger.error("Unable to find punchlines from database");
    return;
  }

  await pRef.set({pollCount: count}, {merge: true});

  // ランキング更新
  await updateRanking(punchline.contestId);
};
