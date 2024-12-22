import express from "express";
import userRouter from "./routes/user";
import courseRouter from "./routes/course";
import bodyParser from "body-parser";

require("dotenv").config();
const cors = require("cors");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.get("/", (req, res) => {
  res.send("School Pro API Server is running | Hello Kovancılar");
});

app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);

export default app;
