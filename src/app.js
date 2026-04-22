import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoute from "./routes/authRoute.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan("dev"));

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoute);

export default app;
