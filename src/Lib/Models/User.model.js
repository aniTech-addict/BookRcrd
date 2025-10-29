import mongoose from "mongoose";
import { passwordEncrypt } from "../Utils/passwordEncrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

},
    {timestamps:true})

UserSchema.pre("save", function(next) {
    this.password = passwordEncrypt(this.password);
    next();
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;