import {connectDB} from "@/dbConfig/dbConfig";  
import User from "@/models/userModel";
import { NextResponse, NextRequest  } from  "next/server";
import bcrypt from "bcryptjs"; // Import bcrypt for password hashing
import { send } from "process";
import { sendEmail } from "@/helpers/mailer";


connectDB();
export async function POST(request: NextRequest) {
    console.log("API RUNNING");
    
    
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);
        // check nguoi dung da ton tai chua
        const user= await User.findOne({ email });
        if (user) {
            return NextResponse.json({ message: "Nguoi dung da ton tai" }, { status: 400 });
        }
        // ma hoa mat khau
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // tao nguoi dung moi
        const newUser = new User({
            username,
            email,
            password: hashedPassword, // Lưu mật khẩu đã được mã hóa
        });
        const savedUser =  await newUser.save();
        console.log("before send mail");

        await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id
        });

        console.log("after send mail");
        return NextResponse.json({ message: "Dang ky thanh cong" }, { status: 201 });
    }
    catch   (error : any) {
        console.error("Error parsing request body:", error);
        return NextResponse.json({ message: "Invalid request body", error: error.message }, { status: 400 });
    }}