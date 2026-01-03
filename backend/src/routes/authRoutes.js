import express from "express";
import { login, register } from "../controllers/authController.js";
import { authProtect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/me", authProtect, (req, res) => {
  res.json({
    id: req.user._id,
    username: req.user.username,
    email: req.user.email,
  });
});

router.post("/register", register)
router.post("/login", login);

export default router;