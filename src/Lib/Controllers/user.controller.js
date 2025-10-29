import mongoose from "mongoose";
import USER from "@/Lib/Models/User.model"
import { validateUserData } from "../Utils/validateUserData";

import connectDb from "@/Lib/Db/connectDb";

export async function createUser(data){

    await connectDb();

    const userData =  validateUserData(data);

    if( !userData.valid ){
        return {
            status:400,
            message:userData.message,
            error: userData.message
        }
    }
    const existingUser = await USER.findOne({
        $or :[{ email: data.email }, { username: data.username }]
    });

    if(existingUser){
        return {
            status:409,
            message:"User Already Exists, Please try logging in instead"
        }
    }

    const newUser = new USER(data);
    await newUser.save();

    return {
        status:201,
        message:"User Created Successfully"
    }
    //more code about creating and saving user


}