import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.models.js";

export const verifyJwt = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Access token is missing" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure JWT_SECRET exists
    const user = await Admin.findById(decoded?._id).select("-password -refreshToken");

    if (!user) return res.status(401).json({ error: "Unauthorized access" });

    req.user = user; 
    next();
  } catch (error) {
    console.error("JWT verification error:", error);
    return res.status(401).json({ error: "Unauthorized access" });
  }
};
