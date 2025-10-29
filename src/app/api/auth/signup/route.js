import { NextResponse } from "next/server" 
import { createUser } from "@/Lib/Controllers/user.controller";
export async function POST(req){
    const data = await req.json();
    const response = await createUser(data);

    if(response.status === 400 || response.status === 404 || response.status === 409){
        return new Response(JSON.stringify({
            status:response.status,
            message:response.message,
            error:response.error || response.message
        }), { status: response.status })
    }

    const res = NextResponse.json({
          status: response.status,
          message: response.message,
        });

    res.cookies.set("accessToken", response.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
}