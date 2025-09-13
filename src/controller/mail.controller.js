import nodemailer from "nodemailer";
import { Admin } from "../models/admin.models.js";
import jwt from "jsonwebtoken";

// fixed sender and receiver
const senderEmail = "ramkrishnam170@gmail.com";
const receiverEmail = "ramkrishnam.bt.22@nitj.ac.in";

// generate 6-digit OTP

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: senderEmail,
    pass: "yoen ltck mcei urcu",
  },
});

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    admin.otp = otp;
    admin.otpExpiry = expiry;
    await admin.save({ validateBeforeSave: false });

    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: receiverEmail,
      subject: "Login OTP",
      text: `Your OTP is ${otp}. It will expire in 5 minutes.`,
    });

    return res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};


export const loginVerifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    if (!admin.otp || admin.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    if (admin.otpExpiry < Date.now()) {
      return res.status(401).json({ error: "OTP expired" });
    }

    // clear OTP
    admin.otp = null;
    admin.otpExpiry = null;

    const refreshToken = admin.generateRefreshToken();
    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });

    const accessToken = admin.generateAccessToken();

    return res.json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
      admin: { _id: admin._id, email: admin.email, role: admin.role }
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
};
