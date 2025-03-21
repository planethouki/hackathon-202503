import * as express from "express";
import {getFirestore} from "firebase-admin/firestore";

const db = getFirestore();

const app = express();

app.get("/:tokenId", async (req, res) => {
  const tokenId = req.params.tokenId;
  const punchlines = await db
    .collection("punchlines")
    .where("tokenIdDec", "==", tokenId)
    .limit(1)
    .get()
    .then((snap) => snap.docs
      .map((doc) => doc.data()));

  if (punchlines.length === 0) {
    res.status(404).send({
      message: "No Tokens found!",
    });
    return;
  }

  const punchline = punchlines[0];

  res.status(200).json({
    name: punchline.title,
    description: "ROFLoLの投稿を表すNFT",
    image: "https://hackathon-51d58.web.app/logo.png",
    external_url: `https://hackathon-51d58.web.app/punchlines/${punchline.id}`,
    attributes: [
      {
        trait_type: "Poll",
        value: punchline.pollCount,
      },
    ],
  });
});

export default app;
