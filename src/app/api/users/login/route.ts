import {connectDB} from "@/dbConfig/dbConfig";  
import User from "@/models/userModel";
import { NextResponse, NextRequest  } from  "next/server";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import jwt from "jsonwebtoken"; // Import jsonwebtoken for token generation

export async function POST(request: NextRequest) {
    console.log("API RUNNING"); 
    try {
        await connectDB();
        const reqBody = await request.json();
        const { email, password } = reqBody;
    
        console.log(reqBody);
        // check nguoi dung da ton tai chua 
        const user= await User.findOne({ email });
        console.log("USER:", user);// check nguoi dung co ton tai khong
        if (!user) {
            return NextResponse.json({ message: "Nguoi dung khong ton tai" }, { status: 400 });
        }
        // check mat khau        const isMatch = await bcrypt.compare(password, user.password);
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ message: "Mat khau khong chinh xac" }, { status: 400 });
        }
        const tokenData = {
            id: user._id,
            email: user.email,
            username: user.username,
        };
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1h" });
        const response = NextResponse.json({ message: "Dang nhap thanh cong", token }, { status: 200 });
        response.cookies.set("token", token, { httpOnly: true, secure: false, sameSite: "strict", maxAge: 3600 });
        return response;
    } catch   (error : any) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "Invalid request body", error: error.message }, { status: 400 });
    }
}