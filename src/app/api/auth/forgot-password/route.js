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
    user.resetTokenExpiry = Date.now() + (5 * 60 * 1000); // 5 minutes
    await user.save();

    const resetUrl = `https://platejade.com/admin/reset-password?token=${token}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
        </head>
        <body>
          <p style="color: black;">You requested a password reset.</p>
          <p style="color: black;">Please, click <a href="${resetUrl}">here</a> to set a new password.</p>
        </body>
        </html>
      `
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