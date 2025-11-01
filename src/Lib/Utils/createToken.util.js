import jwt from "jsonwebtoken";
import USER from "@/Lib/Models/User.model";

export  function createAccessToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  });

}

export function createRefreshToken(user){
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
    }

    //console.log("🔴"+process.env.JWT_REFRESH_SECRET)
    //console.log("🔴"+payload.id)
    
    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })

    return token
    
}