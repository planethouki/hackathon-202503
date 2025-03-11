import {
  onDocumentCreated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {logger} from "firebase-functions";
import updateRanking from "./lib/updateRanking";

const db = getFirestore();

export const onPollCreated = onDocumentCreated(
  "punchlines/{punchlineId}/polls/{pollId}",
  async (event) => {
    const punchlineId = event.params.punchlineId;
    await common(punchlineId);
  }
);

export const onPollDeleted = onDocumentDeleted(
  "punchlines/{punchlineId}/polls/{pollId}",
  async (event) => {
    const punchlineId = event.params.punchlineId;
    await common(punchlineId);
  }
);

const common = async (punchlineId: string) => {
  // 投票数更新
  const {count} = await db
    .collection(`punchlines/${punchlineId}/polls`)
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
