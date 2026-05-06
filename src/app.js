import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import authRoute from "./routes/authRoute.js";
import campaignRoute from "./routes/campaignRoute.js";

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// test route
app.get("/", (req, res) => {
  res.send("API Running...");
});

app.use("/api/auth", authRoute);
app.use("/api/campaigns", campaignRoute);

export default app;
