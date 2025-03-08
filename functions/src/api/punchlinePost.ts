import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

const app = express();

app.get("/contests", async (req, res) => {
  try {
    const contests = await db
      .collection("contests")
      .where("postStartDate", "<=", new Date().toISOString())
      .where("postEndDate", ">=", new Date().toISOString())
      .orderBy("createdAt", "desc")
      .get()
      .then((snapshot) => {
        return snapshot
          .docs
          .map((doc) => doc.data())
          .sort(() => 0.5 - Math.random())
          .slice(0, 8);
      });

    res.status(200).json({
      success: true,
      contests,
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
