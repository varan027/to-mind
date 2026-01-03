import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const authProtect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    console.log("❌ No token received");
    return res.status(401).json({ message: "Not authorized, no token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token decoded:", decoded);

    const user = await User.findById(decoded.userId).select("-password");
    console.log("👤 User from DB:", user);

    if (!user) {
      console.log("❌ User not found in DB");
      return res.status(401).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("JWT Verify Error", error.message);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};
