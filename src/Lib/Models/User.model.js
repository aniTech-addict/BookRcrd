import mongoose from "mongoose";
import { passwordEncrypt } from "../Utils/passwordEncrypt";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        index: true
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
    refreshToken: {
        type: String,
        unique:true,
        index: true
    }
},
    {timestamps:true})

UserSchema.pre("save", function(next) {
    // Only encrypt password if it's being modified or is new
    if (this.isModified('password') || this.isNew) {
        this.password = passwordEncrypt(this.password);
    }
    next();
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;