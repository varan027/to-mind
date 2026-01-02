import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./src/routes/notesRoutes.js";
import { connectDB } from "./src/config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://tomind-git-main-varan027s-projects.vercel.app/"
];

  app.use(
    cors({
      origin: allowedOrigins,
    })
  );

app.use(express.json());

app.use("/api", notesRoutes);

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server is running on PORT:", PORT);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
  });