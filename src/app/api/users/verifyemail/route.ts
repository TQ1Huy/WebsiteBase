import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";



connectDB();


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        const user = await User.findOne({hashToken: token, verifyTokenExpiry: {$gt: Date.now()}});
        if(!user) {
            return NextResponse.json({error: "Invalid or expired token"}, {status: 400})
        }
        console.log(user);

        user.isVerified = true;
        user.hashToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message: "Email verified successfully"}, {status: 200})
    } catch (error:any) {
        return NextResponse.json({error: error.message}, {status: 500})
        
    }
}