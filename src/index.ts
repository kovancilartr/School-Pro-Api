import express from "express";
import customerRouter from "./routes/customer";
import userRouter from "./routes/user";
import courseRouter from "./routes/course";
import serverless from "serverless-http";
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
app.get("/test", (req, res) => {
  res.send("Hello World!");
});
app.use("/api/v1", customerRouter);
app.use("/api/v1", userRouter);
app.use("/api/v1", courseRouter);

export const handler = serverless(app); // Vercel'in desteklediği format
