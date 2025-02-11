import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import connectToDatabase from "./db/mongodb.js";
import cookieParser from "cookie-parser";
import errorMiddleware from "./error.middleware.js";
import cors from "cors";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(cookieParser());
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use(errorMiddleware);
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(PORT, 1000);
  await connectToDatabase();
});

export default app;
