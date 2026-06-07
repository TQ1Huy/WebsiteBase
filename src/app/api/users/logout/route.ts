import { NextResponse } from "next/server";



export async function GET() {
    try {
        const response = NextResponse.json({ message: "Đăng xuất thành công", success: true, }
        )
        response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
        return response;
    
    }
    
        
     catch (error : any) {
        return NextResponse.json({ message: "Đăng xuất thất bại" }, { status: 500 });
    }
}