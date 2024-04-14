import { connectToDb } from "@/config/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connectToDb();

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const reqBody = await req.json();
    const { username, email, password }: any = reqBody;

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: await hashedPassword,
    });

    const savedUser = await newUser.save();

    await sendEmail({ email, emailType: "VERIFY", _id: savedUser._id });

    return NextResponse.json(
      { message: "User created Successfully" },
      { status: 201 }
    );
  
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
