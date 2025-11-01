import { NextResponse } from "next/server" 
import {loginUser} from "@/Lib/Controllers/user.controller.js";

export async function POST(req){
    // req = {username||email, password}
    const data = await req.json();
    
    // console.log("Data from route:🔴 ", data)

    const controllerResponse = await loginUser(data);
    if(controllerResponse.status === 400 || controllerResponse.status === 404 || controllerResponse.status === 409){
        return new Response(JSON.stringify({
            status:controllerResponse.status,
            message:controllerResponse.message,
            error:controllerResponse.error || controllerResponse.message
        }), { status: controllerResponse.status })
    }

    
    if (controllerResponse.status === 200) {
    const  accessToken  = controllerResponse.accessTOken;

    const res = NextResponse.json({
      status: 200,
      message: "Login successful",
    });

    // set httpOnly cookie
    res.cookies.set("accessToken", controllerResponse.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return res;
  }

}