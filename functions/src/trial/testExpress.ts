import * as express from "express";
import {onRequest} from "firebase-functions/v2/https";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

export const testExpress = onRequest(app);
