import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";
import {calcAddress} from "../ethUtils";

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

  if (punchlines.length === 0) {
    res.status(200).json({
      status: "success",
      user: users[0],
      punchlines,
    });
    return;
  }

  const contestsDetails = await db
    .collection("contests")
    .where("id", "in", punchlines.map((p) => p.contestId))
    .get()
    .then((c) => {
      return c.docs.map((doc) => doc.data());
    });

  const updatedPunchlines = punchlines.map((punchline) => {
    const matchingContest = contestsDetails.find(
      (contest) => contest.id === punchline.contestId
    );
    const pollAddress = calcAddress(punchline.id);
    return {
      ...punchline,
      contest: matchingContest || null,
      pollAddress,
    };
  });

  res.status(200).json({
    status: "success",
    user: users[0],
    punchlines: updatedPunchlines,
  });
});

export default app;
