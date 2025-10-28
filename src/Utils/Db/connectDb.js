import mongoose from "mongoose";

export default function connectDb(){
    mongoose.connect({
        url: process.env.MONGODB_URI,
        dbName: process.env.DATABASE_NAME
    })
    .then(() => console.log("Connection to DB Successful ✅"))
    .catch((err) => console.log("❌"+err)) 

    mongoose.connection.on("disconnected", () => {
        console.log("Disconnected from DB")
    })
}