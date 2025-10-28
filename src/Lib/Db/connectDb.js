import mongoose from "mongoose";

let isConnected = false;

export default function connectDb(){

    if(isConnected){
        console.log("MongoDB is already connected")
        return
    }

    mongoose.connect(process.env.MONGODB_URI,{
        dbName: "BookDir"
    }).then(() => {
        console.log("Connection to DB Successful ✅")
        isConnected = true;
    }).catch((err) => console.log("❌"+err)) 

    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from DB")
    })
}