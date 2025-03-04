import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

const app = express();

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const users = await db
    .collection("users")
    .where("id", "==", id)
    .limit(1)
    .get()
    .then((snap) => snap.docs
      .map((doc) => doc.data()));
  if (users.length === 0) {
    res.status(404).send("No users found!");
    return;
  }

  const punchlines = await db
    .collection("punchlines")
    .where("userId", "==", id)
    .orderBy("createdAt", "desc")
    .limit(4)
    .get()
    .then((snap) => snap.docs
      .map((doc) => doc.data()));

  const contestsDetailsQuery = db
    .collection("contests")
    .where("id", "in", punchlines.map((p) => p.contestId))
    .get();

  const [
    contestsDetails,
  ] = await Promise.all([contestsDetailsQuery])
    .then(([c]) => {
      return [
        c.docs.map((doc) => doc.data()),
      ];
    });

  const updatedPunchlines = punchlines.map((punchline) => {
    const matchingContest = contestsDetails.find(
      (contest) => contest.id === punchline.contestId
    );
    return {
      ...punchline,
      contest: matchingContest || null,
    };
  });

  res.status(200).json({
    status: "success",
    user: users[0],
    punchlines: updatedPunchlines,
  });
});

export default app;
