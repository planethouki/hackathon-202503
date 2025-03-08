import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {logger} from "firebase-functions";
import updateRanking from "./lib/updateRanking";

const db = getFirestore();

export const onPunchlineWritten = onDocumentWritten(
  "punchlines/{docId}", async (event) => {
    // パラメータ更新
    const {count} = await db
      .collection("punchlines")
      .count()
      .get()
      .then((q) => q.data());

    await db
      .collection("parameters")
      .doc("punchlines")
      .set({count}, {merge: true});

    // 回答数更新
    const afterData = event.data?.after?.data();
    const beforeData = event.data?.before?.data();
    let contestId;
    if (afterData) contestId = afterData.contestId;
    else if (beforeData) contestId = beforeData.contestId;

    if (!contestId) {
      logger.error("Could not find any contest id");
      return;
    }

    const {count: countEqContestId} = await db
      .collection("punchlines")
      .where("contestId", "==", contestId)
      .count()
      .get()
      .then((q) => q.data());

    await db
      .doc(`contests/${contestId}`)
      .set({punchlineCount: countEqContestId}, {merge: true});

    // ランキング更新
    await updateRanking(contestId);
  }
);
