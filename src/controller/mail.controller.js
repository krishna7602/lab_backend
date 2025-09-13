import sgMail from "@sendgrid/mail";
import { Admin } from "../models/admin.models.js";
import dotenv from "dotenv";
dotenv.config();

// Fixed receiver


// Initialize SendGrid
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    console.log(admin);
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    console.log(otp);

    // Save OTP and expiry in DB
    admin.otp = otp;
    admin.otpExpiry = expiry;
    await admin.save({ validateBeforeSave: false });
    // Send email via SendGrid API
    const msg = {
      to: "ramkrishnam170@gmail.com", // fixed receiver
      from: "ramkrishnabackup0@gmail.com", // must be verified in SendGrid
      subject: `Login OTP for ${email}`,
      text: `User: ${email}\nOTP: ${otp}. It will expire in 5 minutes.`,
    };
    console.log(msg)
    await sgMail.send(msg);
    console.log(`after sending ${msg}`)

    return res.json({ success: true, message: "OTP sent to fixed receiver email" });
  } catch (err) {
    console.error("sendOtp error:", err);
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

    // Clear OTP
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
      admin: { _id: admin._id, email: admin.email, role: admin.role },
    });
  } catch (err) {
    console.error("loginVerifyOtp error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
