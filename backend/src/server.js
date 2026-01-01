import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
// const __dirname = path.resolve();

const allowedOrigins = [
  "http://localhost:5173",
  "https://to-mind.vercel.app"
];

if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: allowedOrigins,
    })
  );
}

app.use(express.json());
app.use(rateLimiter);

app.use("/", notesRoutes);

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "../frontend/dist")));
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
//   });
// }

app.get("/", (req, res) => {
  res.send("API is running 🚀");
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

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
