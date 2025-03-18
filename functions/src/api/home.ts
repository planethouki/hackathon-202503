import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";
import {calcAddress} from "../ethUtils";

const db = getFirestore();

const app = express();

app.get("/", async (req, res) => {
  try {
    const now = new Date();
    const twoHoursFuture = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    const contestsQuery = db
      .collection("contests")
      .where("postStartDate", "<", twoHoursFuture.toISOString())
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

    const [
      contestsDetails,
      usersDetails,
    ] = await Promise.all([
      contestsDetailsQuery,
      usersDetailsQuery,
    ])
      .then(([c, u]) => {
        return [
          c.docs.map((doc) => doc.data()),
          u.docs.map((doc) => doc.data()),
        ];
      });

    const updatedPunchlines = punchlines.map((punchline) => {
      const matchingContest = contestsDetails.find(
        (contest) => contest.id === punchline.contestId
      );
      const matchingUser = usersDetails.find(
        (contest) => contest.id === punchline.userId
      );
      const pollAddress = calcAddress(punchline.id);
      return {
        ...punchline,
        contest: matchingContest || null,
        user: matchingUser || null,
        pollAddress,
      };
    });

    res.status(200).json({
      success: true,
      contests,
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
