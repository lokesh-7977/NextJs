import { connectToDb } from "@/config/dbConfig";
import { NextRequest , NextResponse } from "next/server";
import User from '@/models/userModel'

connectToDb();


export async function POST(request : NextRequest){
    const reqBody = await request.json();

    const {token } = reqBody;
    const user = await User.findOne({verifyToken : token ,verifyTokenExpiry: {$gt : Date.now()}})

    if(!user){
        return NextResponse.json("Invalid Token")

    }
user.isVerified = true ;
user.verifyToken = undefined;
user.verifyTokenExpiry = undefined;
await user.save();

return NextResponse.json({
    success : true,
    message : "Email Verified Successfully"
})

}
