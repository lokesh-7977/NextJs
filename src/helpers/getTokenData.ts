import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export async function getTokenData(res : NextResponse) {
    try {
        const token = res.cookies.get("token")?.value;
        if (!token) {
            throw new Error("No token found");
        }
        const decodedToken : any  = jwt.verify(token, process.env.SECRET!);
        return decodedToken.id;
        
    } catch (error) {
        throw new Error("Error getting token data");
    }

    
}