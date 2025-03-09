import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";
import {calcAddress} from "../ethUtils";

const db = getFirestore();

const app = express();

app.get("/latest", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;

    const totalPunchlinesDoc = db
      .collection("parameters")
      .doc("punchlines")
      .get();
    const punchlinesQuery = db
      .collection("punchlines")
      .orderBy("createdAt", "desc")
      .offset((page - 1) * 4)
      .limit(4)
      .get();

    const {
      totalPunchlines,
      punchlines,
    } = await Promise.all([
      totalPunchlinesDoc,
      punchlinesQuery,
    ]).then(([totalPunchlinesSnap, punchlineSnap]) => {
      const totalPunchlines = totalPunchlinesSnap.exists ?
        totalPunchlinesSnap.data()?.count as number || 0 :
        0;
      const punchlines = punchlineSnap
        .docs
        .map((doc) => doc.data());
      return {
        totalPunchlines,
        punchlines,
      };
    });

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
      punchlines: updatedPunchlines,
      totalPunchlines,
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

  const pollAddress = calcAddress(punchline.id);

  res.status(200).json({
    status: "success",
    punchline: {
      contest: matchingContest,
      user: matchingUser,
      pollAddress,
      ...punchline,
    },
  });
});

export default app;
