import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";
import {calcAddress} from "../ethUtils";

const db = getFirestore();

const app = express();

app.get("/latest", async (req, res) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const perPage = 8;

    const totalContestsDoc = db
      .collection("parameters")
      .doc("contests")
      .get();
    const contestsQuery = db
      .collection("contests")
      .orderBy("createdAt", "desc")
      .offset((page - 1) * perPage)
      .limit(perPage)
      .get();

    const {
      totalContests,
      contests,
    } = await Promise.all([
      totalContestsDoc,
      contestsQuery,
    ]).then(([totalContestsSnap, contestsSnap]) => {
      const totalContests = totalContestsSnap.exists ?
        totalContestsSnap.data()?.count as number || 0 :
        0;
      const contests = contestsSnap
        .docs
        .map((doc) => doc.data());
      return {
        totalContests,
        contests,
      };
    });

    const punchlinesDetailsQuery = db
      .collection("punchlines")
      .where("contestId", "in", contests.map((p) => p.id))
      .get();

    const [
      punchlinesDetails,
    ] = await Promise.all([punchlinesDetailsQuery])
      .then(([p]) => {
        return [
          p.docs.map((doc) => doc.data()),
        ];
      });

    const updatedContests = contests.map((contest) => {
      const matchingPunchlines = punchlinesDetails
        .filter((punchline) => punchline.contestId === contest.id)
        .map((punchline) => {
          const pollAddress = calcAddress(punchline.id);
          return {
            ...punchline,
            pollAddress,
          };
        });
      return {
        ...contest,
        punchlines: matchingPunchlines,
      };
    });

    res.status(200).json({
      success: true,
      contests: updatedContests,
      totalContests,
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

  const [
    punchlinesLatest,
    punchlinesPopular,
  ] = await Promise.all([
    db
      .collection("punchlines")
      .where("contestId", "==", id)
      .orderBy("createdAt", "desc")
      .limit(4)
      .get(),
    db
      .collection("punchlines")
      .where("contestId", "==", id)
      .orderBy("pollCount", "desc")
      .orderBy("createdAt", "asc")
      .limit(4)
      .get(),
  ]).then(([latest, popular]) => {
    return [
      latest.docs.map((doc) => doc.data()),
      popular.docs.map((doc) => doc.data()),
    ];
  });

  if (punchlinesLatest.length === 0 && punchlinesPopular.length === 0) {
    res.status(200).json({
      status: "success",
      contest: contests[0],
      punchlinesLatest,
      punchlinesPopular,
    });

    return;
  }

  const userIds = punchlinesLatest.map((p) => p.userId)
    .concat(punchlinesPopular.map((p) => p.userId));

  const usersDetails = await db
    .collection("users")
    .where("id", "in", userIds)
    .get()
    .then((u) => {
      return u.docs.map((doc) => doc.data());
    });

  const updatedPunchlinesLatest = punchlinesLatest.map((punchline) => {
    const matchingUser = usersDetails.find(
      (contest) => contest.id === punchline.userId
    );
    const pollAddress = calcAddress(punchline.id);
    return {
      ...punchline,
      user: matchingUser || null,
      pollAddress,
    };
  });

  const updatedPunchlinesPopular = punchlinesPopular.map((punchline) => {
    const matchingUser = usersDetails.find(
      (contest) => contest.id === punchline.userId
    );
    const pollAddress = calcAddress(punchline.id);
    return {
      ...punchline,
      user: matchingUser || null,
      pollAddress,
    };
  });

  res.status(200).json({
    status: "success",
    contest: contests[0],
    punchlinesLatest: updatedPunchlinesLatest,
    punchlinesPopular: updatedPunchlinesPopular,
  });
});

export default app;
