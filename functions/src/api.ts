import * as express from "express";
import * as cors from "cors";
import home from "./api/home";
import punchlines from "./api/punchlines";
import contests from "./api/contests";
import users from "./api/users";

const app = express();

app.use(cors());

app.get("/hello", (req, res) => {
  res.send("Hello World!");
});

app.use("/home", home);
app.use("/punchlines", punchlines);
app.use("/contests", contests);
app.use("/users", users);

export default app;
