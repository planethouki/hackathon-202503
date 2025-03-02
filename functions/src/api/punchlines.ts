import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

const app = express();

app.get("/latest", async (req, res) => {
  try {
    const punchlinesQuery = await db
      .collection("punchlines")
      .orderBy("createdAt", "desc")
      .limit(4)
      .get();

    const [
      punchlineSnap,
    ] = await Promise.all([
      punchlinesQuery,
    ]);

    const punchlines = punchlineSnap.docs.map((doc) => doc.data());

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
    ] = await Promise.all([contestsDetailsQuery, usersDetailsQuery])
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
      return {
        ...punchline,
        contest: matchingContest || null,
        user: matchingUser || null,
      };
    });

    res.status(200).json({
      success: true,
      punchlines: updatedPunchlines,
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

app.get("/:id", async (req: express.Request, res: express.Response) => {
  const id = req.params.id;
  const punchlines = await db
    .collection("punchlines")
    .where("id", "==", id)
    .limit(1)
    .get()
    .then((snap) => snap.docs
      .map((doc) => doc.data()));
  if (punchlines.length === 0) {
    res.status(404).send("No punchlines found!");
    return;
  }

  const punchline = punchlines[0];

  const contestsDetailsQuery = db
    .collection("contests")
    .where("id", "==", punchline.contestId)
    .limit(1)
    .get();
  const usersDetailsQuery = db
    .collection("users")
    .where("id", "==", punchline.userId)
    .limit(1)
    .get();

  const [
    contestsDetails,
    usersDetails,
  ] = await Promise.all([contestsDetailsQuery, usersDetailsQuery])
    .then(([c, u]) => {
      return [
        c.docs.map((doc) => doc.data()),
        u.docs.map((doc) => doc.data()),
      ];
    });
  const matchingContest = contestsDetails.find(
    (contest) => contest.id === punchline.contestId
  );
  const matchingUser = usersDetails.find(
    (contest) => contest.id === punchline.userId
  );

  res.status(200).json({
    status: "success",
    punchline: {
      contest: matchingContest,
      user: matchingUser,
      ...punchline,
    },
  });
});

export default app;
