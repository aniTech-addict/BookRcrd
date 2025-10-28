import BOOK from "@/Lib/Models/Books.model";
import { getBooks } from "@/Lib/Controllers/book.controller.js";
import connectDb from "@/Lib/Db/connectDb";
export async function GET(req) {
    try{
        connectDb();
        const response = await getBooks();
        // response.data: {Object} Books
        return new Response(JSON.stringify({data: response.data}), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            }
        });
    } catch (err) {
        console.log("⚠️ Error encounter in Books route",err);
        return new Response(JSON.stringify({error: "Internal Server Error"}), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }
}