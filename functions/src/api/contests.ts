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
    res.status(404).send("No punchlines found!");
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

  res.status(200).json({
    status: "success",
    contest: contests[0],
    punchlines,
  });
});

export default app;
