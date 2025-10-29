import mongoose from "mongoose";
import USER from "@/Lib/Models/User.model"
import { validateUserData } from "../Utils/validateUserData";
import { createToken } from '../Utils/createToken';
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

    const token = createToken(newUser);

    return {
        status:201,
        message:"User Created Successfully",
        token,
    }
}

export async function loginUser(data){

    await connectDb();

    // check if user exits
    const existingUser = await USER.findOne({
        $or :[{ email: data.email }, { username: data.username }]
    });

    if(!existingUser){
        return{
            status:401,
            message:"user does not exist"
        }
    }

    const match = bcrypt.compare(existingUser.password);
    if (!match){
        return {
            status:401,
            message:"invalid password"
        }
    }
    
    const user = {
        id:existingUser._id,
        username:existingUser.username,
        email:existingUser.email
    }
    const accessToken= createAccessToken(user);
    const refreshToken= createRefreshToken(user);

    //Setting up Cookies , hueheu
    return {
        status:200,
        message:"user authenticated",
        refreshToken: refreshToken,
        accessToken: accessToken
    }
}