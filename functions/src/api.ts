import {onRequest} from "firebase-functions/v2/https";
import {defineSecret} from "firebase-functions/params";
import * as express from "express";
import * as cors from "cors";
import home from "./api/home";
import punchlines from "./api/punchlines";
import contests from "./api/contests";
import users from "./api/users";
import punchlinePost from "./api/punchlinePost";

const privateKey = defineSecret("ETH_PRIVATE_KEY");

const app = express();

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/home", home);
app.use("/punchlines", punchlines);
app.use("/contests", contests);
app.use("/users", users);
app.use("/punchline/post", punchlinePost);

export const api = onRequest({
  secrets: [privateKey],
}, app);
