import {
  onDocumentCreated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {logger} from "firebase-functions";
import updateRanking from "./lib/updateRanking";

const db = getFirestore();

export const onPunchlineCreated = onDocumentCreated(
  "punchlines/{docId}", async (event) => {
    await updateParameter();
    const contestId = event.data?.data()?.contestId as string;
    if (!contestId) {
      logger.error("Could not find any contest id");
      return;
    }
    await updateRanking(contestId);
    await updatePunchlineCount(contestId);
  }
);

export const onPunchlineDeleted = onDocumentDeleted(
  "punchlines/{docId}", async (event) => {
    await updateParameter();
    const contestId = event.data?.data()?.contestId as string;
    if (!contestId) {
      logger.error("Could not find any contest id");
      return;
    }
    await updateRanking(contestId);
    await updatePunchlineCount(contestId);
  }
);

const updateParameter = async () => {
  const {count} = await db
    .collection("punchlines")
    .count()
    .get()
    .then((q) => q.data());

  await db
    .collection("parameters")
    .doc("punchlines")
    .set({count}, {merge: true});
};

const updatePunchlineCount = async (contestId: string) => {
  const {count: countEqContestId} = await db
    .collection("punchlines")
    .where("contestId", "==", contestId)
    .count()
    .get()
    .then((q) => q.data());

  await db
    .doc(`contests/${contestId}`)
    .set({punchlineCount: countEqContestId}, {merge: true});
};
