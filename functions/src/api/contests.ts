import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

const app = express();

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  const contests = await db
    .collection("contests")
    .where("id", "==", id)
    .limit(1)
    .get()
    .then((snap) => snap.docs
      .map((doc) => doc.data()));
  if (contests.length === 0) {
    res.status(404).send("No contests found!");
    return;
  }
  const punchlines = await db
    .collection("punchlines")
    .where("contestId", "==", id)
    .orderBy("createdAt", "desc")
    .limit(4)
    .get()
    .then((snap) => snap.docs
      .map((doc) => doc.data()));

  if (punchlines.length === 0) {
    res.status(200).json({
      status: "success",
      contest: contests[0],
      punchlines,
    });

    return;
  }

  const usersDetails = await db
    .collection("users")
    .where("id", "in", punchlines.map((p) => p.userId))
    .get()
    .then((u) => {
      return u.docs.map((doc) => doc.data());
    });

  const updatedPunchlines = punchlines.map((punchline) => {
    const matchingUser = usersDetails.find(
      (contest) => contest.id === punchline.userId
    );
    return {
      ...punchline,
      user: matchingUser || null,
    };
  });

  res.status(200).json({
    status: "success",
    contest: contests[0],
    punchlines: updatedPunchlines,
  });
});

export default app;
