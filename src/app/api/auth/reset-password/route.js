import bcrypt from 'bcryptjs';
import User from '../../../models/user';
import { NextResponse } from 'next/server';
import connect from '../../../utils/db';

export async function POST(req, res) {
  try {
    const { token, newPassword } = await req.json();

    await connect();

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({ success: false, message: 'Invalid or expired token' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    return NextResponse.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error('Error resetting password:', error);
    return NextResponse.json({ success: false, error: error.message });
  }
}