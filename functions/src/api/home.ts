import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

const app = express();

app.get("/", async (req, res) => {
  try {
    const contestsQuery = db
      .collection("contests")
      .orderBy("createdAt", "desc")
      .limit(8)
      .get();
    const punchlinesQuery = db
      .collection("punchlines")
      .orderBy("createdAt", "desc")
      .limit(4)
      .get();
    const usersQuery = db
      .collection("users")
      .orderBy("createdAt", "desc")
      .limit(16)
      .get();

    const [
      contestsSnap,
      punchlineSnap,
      userSnap,
    ] = await Promise.all([
      contestsQuery,
      punchlinesQuery,
      usersQuery,
    ]);

    const contests = contestsSnap.docs.map((doc) => doc.data());
    const punchlines = punchlineSnap.docs.map((doc) => doc.data());
    const users = userSnap.docs.map((doc) => doc.data());

    const contestsDetailsQuery = db
      .collection("contests")
      .where("id", "in", punchlines.map((p) => p.contestId))
      .get();
    const usersDetailsQuery = db
      .collection("users")
      .where("id", "in", punchlines.map((p) => p.userId))
      .get();
    const punchlinesDetailsQuery = db
      .collection("punchlines")
      .where("contestId", "in", contests.map((c) => c.id))
      .get();

    const [
      contestsDetails,
      usersDetails,
      punchlineDetails,
    ] = await Promise.all([
      contestsDetailsQuery,
      usersDetailsQuery,
      punchlinesDetailsQuery,
    ])
      .then(([c, u, p]) => {
        return [
          c.docs.map((doc) => doc.data()),
          u.docs.map((doc) => doc.data()),
          p.docs.map((doc) => doc.data()),
        ];
      });

    const updatedPunchlines = punchlines.map((punchline) => {
      const matchingContest = contestsDetails.find(
        (contest) => contest.id === punchline.contestId
      );
      const matchingUser = usersDetails.find(
        (contest) => contest.id === punchline.userId
      );
      return {
        ...punchline,
        contest: matchingContest || null,
        user: matchingUser || null,
      };
    });

    const updatedContests = contests.map((contest) => {
      const punchlineCount = punchlineDetails
        .filter((p) => p.contestId === contest.id)
        .length;
      return {
        ...contest,
        punchlineCount,
      };
    });

    res.status(200).json({
      success: true,
      contests: updatedContests,
      punchlines: updatedPunchlines,
      users,
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    res.status(500).json({
      success: false,
      message: "Error fetching data",
      error,
    });
  }
});

export default app;
