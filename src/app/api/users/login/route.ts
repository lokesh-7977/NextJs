import { connectToDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connectToDb();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email, password }: any = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: "Please fill all fields" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return NextResponse.json({ message: "Invalid credentials" });
    }

    const tokenData = {
      id: user._id.toString(), 
      email: user.email,
      username: user.username
    };

    const token = jwt.sign(tokenData, process.env.SECRET!, { expiresIn: process.env.Expiry });

    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set('token', token, { httpOnly: true, sameSite: 'strict' });
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Server error", error }, { status: 500 });
  }
}
