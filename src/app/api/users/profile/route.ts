import { NextRequest, NextResponse } from "next/server";
import { getTokenData } from "@/helpers/getTokenData";
import { connectToDb } from "@/config/dbConfig";
import User from "@/models/userModel";

connectToDb();

export async function GET(res: NextResponse, req: NextRequest) {
  try {
    const userId = await getTokenData(res);
    const user = await User.findById({ _id: userId }).select("-password");
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { message: "Error getting token data" },
      { status: 500 }
    );
  }
}
