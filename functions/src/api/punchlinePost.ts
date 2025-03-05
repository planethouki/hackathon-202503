import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

const app = express();

app.get("/contests", async (req, res) => {
  try {
    const contests = await db
      .collection("contests")
      .where("pollStartDate", "<=", new Date().toISOString())
      .where("pollEndDate", ">=", new Date().toISOString())
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        return snapshot
          .docs
          .map((doc) => doc.data())
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);
      });

    const punchlines = await db
      .collection("punchlines")
      .where("contestId", "in", contests.map((c) => c.id))
      .get()
      .then((snapshot) =>
        snapshot
          .docs
          .map((doc) => doc.data())
      );

    const updatedContests = contests
      .map((c) => {
        const count = punchlines
          .filter((p) => p.contestId === c.id)
          .length;
        return {
          punchlineCount: count,
          ...c,
        };
      });

    res.status(200).json({
      success: true,
      contests: updatedContests,
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
