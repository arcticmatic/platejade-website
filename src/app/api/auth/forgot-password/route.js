import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import User from '../../../models/user';
import { NextResponse } from 'next/server';
import connect from '../../../utils/db';

export async function POST(req, res) {
  try {
    const { email } = await req.json();

    await connect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ success: false, message: 'No account is found for this address.' });
    }

    const token = uuidv4();
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `<p>You requested a password reset. Click <a href="https://platejade.com/admin/reset-password">here</a> to reset your password.</p>`,
    };

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: 'We have sent you an email with further instructions on how to reset your password.' });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}