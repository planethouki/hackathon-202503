import {onDocumentWritten} from "firebase-functions/v2/firestore";
import {getFirestore} from "firebase-admin/firestore";
import {logger} from "firebase-functions";

const db = getFirestore();

export const onPollWritten = onDocumentWritten(
  "punchlines/{punchlineId}/polls/{pollId}", async (event) => {
    // 投票数更新
    const punchlineId = event.params.punchlineId;

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
    const contestId = punchline.contestId;

    const punchlinesContestEq = await db
      .collection("punchlines")
      .where("contestId", "==", contestId)
      .select("id", "pollCount")
      .get()
      .then((snap) => snap.docs.map((doc) => doc.data()));

    const punchlinesSorted = punchlinesContestEq
      .sort((a, b) => a.pollCounte - b.pollCount);

    for (const p of punchlinesSorted) {
      const i = punchlinesSorted.indexOf(p);
      await db
        .doc(`punchlines/${p.id}`)
        .set({rankingInContest: i + 1}, {merge: true});
    }
  }
);
