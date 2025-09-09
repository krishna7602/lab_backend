import {Admin} from "../models/admin.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// =================== Admin Registration ===================
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    //console.log(name,email,password,role)
    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const existingAdmin = await Admin.findOne({ email: email.toLowerCase() });
    if (existingAdmin) return res.status(400).json({ error: "Admin already exists!" });

    const newAdmin = await Admin.create({ name, email, password, role });

    res.status(201).json({ message: "Admin registered successfully", adminId: newAdmin._id });
  } catch (err) {
    console.error(err);
    res.status(510).json({ error: err.message });
  }
};

// =================== Admin Login ===================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) return res.status(401).json({ error: "Incorrect password" });

    // Generate JWT tokens
    const accessToken = jwt.sign(
      { _id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const refreshToken = jwt.sign(
      { _id: admin._id, role: admin.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    // Set cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    // Final response
    return res.status(200).json({
      message: "Login successful",
      admin: {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      accessToken,
      refreshToken,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Login failed" });
  }
};

// =================== Refresh Access Token ===================
const refreshAccessToken = async (req, res) => {
  try {
    const incomingToken = req.cookies.refreshToken || req.body.refreshToken;
    if (!incomingToken) return res.status(400).json({ error: "Refresh token is required" });

    const decoded = jwt.verify(incomingToken, process.env.REFRESH_TOKEN_SECRET);
    const admin = await Admin.findById(decoded._id);

    if (!admin || admin.refreshToken !== incomingToken)
      return res.status(403).json({ error: "Invalid refresh token" });

    const accessToken = jwt.sign({ _id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    const refreshToken = jwt.sign({ _id: admin._id, role: admin.role }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    res.status(200).json({ message: "Tokens refreshed", accessToken, refreshToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not refresh token" });
  }
};

// =================== Logout ===================
const logoutAdmin = async (req, res) => {
  try {
    await Admin.findByIdAndUpdate(req.admin._id, { refreshToken: null });
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Logout failed" });
  }
};

// ===================forgot password=====================

// =================== Forgot Password ===================
const forgotPassword = async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(404).json({ error: "No admin found with this email" });
    }

    // Update password
    admin.password = newPassword;
    await admin.save({ validateBeforeSave: false });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    console.error("Forgot password error:", err);
    return res.status(500).json({ error: "Could not reset password" });
  }
};

// =================== Change Password ===================

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isPasswordValid = await admin.comparePassword(oldPassword);
    if (!isPasswordValid) return res.status(401).json({ error: "Old password incorrect" });

    admin.password = newPassword;
    await admin.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not change password" });
  }
};

// =================== Change Email ===================
const changeEmail = async (req, res) => {
  try {
    const { newEmail, password } = req.body;
    const admin = await Admin.findById(req.admin._id);

    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const isPasswordValid = await admin.comparePassword(password);
    if (!isPasswordValid) return res.status(401).json({ error: "Password incorrect" });

    admin.email = newEmail.toLowerCase();
    await admin.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Email updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not update email" });
  }
};

const getAllpeople = async (req, res) => {
  try {
    const people = await Admin.find().sort({ createdAt: -1 }); // newest first
    return res.status(200).json({
      success: true,
      data: people,
    });
  } catch (error) {
    console.error("Error fetching people:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch people",
    });
  }
};

export  {
  registerAdmin,
  loginAdmin,
  refreshAccessToken,
  logoutAdmin,
  changePassword,
  changeEmail,
  getAllpeople,
  forgotPassword
};
