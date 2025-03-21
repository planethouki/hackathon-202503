import {onRequest} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import * as express from "express";
import * as cors from "cors";
import punchline from "./token/punchline";

const privateKey = defineSecret("ETH_PRIVATE_KEY");

const app = express();

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/punchline", punchline);

export const token = onRequest({
  secrets: [privateKey],
}, app);
