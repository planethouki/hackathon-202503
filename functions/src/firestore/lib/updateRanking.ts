import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

/**
 * Updates the ranking of punchlines in a contest based on poll counts.
 *
 * @param {string} contestId - The ID of the contest to update rankings for.
 */
async function updateRanking(contestId: string) {
  const punchlinesContestEq = await db
    .collection("punchlines")
    .where("contestId", "==", contestId)
    .select("id", "pollCount", "createdAt")
    .get()
    .then((snap) => snap.docs.map((doc) => doc.data()));

  const punchlinesSorted = punchlinesContestEq
    .sort((a, b) => {
      const diff = b.pollCount - a.pollCount;
      if (diff !== 0) {
        return diff;
      }

      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });

  for (const p of punchlinesSorted) {
    const i = punchlinesSorted.indexOf(p);
    await db
      .doc(`punchlines/${p.id}`)
      .set({rankingInContest: i + 1}, {merge: true});
  }
}

export default updateRanking;
