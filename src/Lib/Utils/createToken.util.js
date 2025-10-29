import jwt from "jsonwebtoken";

export  function createAccessToken(user) {
  const payload = {
    id: user._id,
    email: user.email,
    username: user.username,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRY
  });

}

export function createRefreshToken(user){
    const payload = {
        id: user._id,
        email: user.email,
        username: user.username,
    }

    const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    })
}