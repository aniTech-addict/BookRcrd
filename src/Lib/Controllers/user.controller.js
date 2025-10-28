import mongoose from "mongoose";
import USER from "@/Lib/Models/User.model"

export function postUser(data){
    if(data?.username || data?.email ||data?.password){
        return {
            status:404,
            message:"Fields can't be empty for registration",
        }
    }
    const newUser = USER.findOne(email)
}