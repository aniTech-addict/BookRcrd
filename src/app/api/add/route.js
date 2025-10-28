import { postBooks } from "@/Lib/Controllers/book.controller";
import connectDb from "@/Lib/Db/connectDb";
export async function POST(req){
    connectDb();
    const data = await req.json();

    //fn response: {Object}
    const response = await postBooks(data);

    if(response.status === 500){
        console.log("------🚨 Error Encountered in Controller ------ \n"+response.error)
        return new Response(JSON.stringify({error:response.error}), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            }
        })
    }

    return new Response(JSON.stringify({data:"Added"}), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        }
    })
}