import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers["authorization"]?.split(" ")[1];
    console.log(token)
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).json({ message: "Unauthorized" });
    req.user = decoded;
    next();
  });
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(410).json({ error: "Unauthorized access" });
  }
};
