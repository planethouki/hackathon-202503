import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();


const app = express();

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.get("/home", async (req, res) => {
  try {
    const contests = await db
      .collection("contests")
      .orderBy("createdAt", "asc")
      .limit(8)
      .get()
      .then((snapshot) => {
        return snapshot.docs.map((doc) => doc.data());
      });
    res.status(200).json({success: true, contests});
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
