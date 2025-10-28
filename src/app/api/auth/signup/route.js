import { createUser } from "@/Lib/Controllers/user.controller";
export async function POST(req){
    const data = await req.json();
    const response = await createUser(data);

    if(response.status === 404){
        return new Response(JSON.stringify({
            status:404,
            message:"Error Occurred",
            error:response.error
        }), { status: 404 })
    }

    return new Response(JSON.stringify({
        status:response.status,
        message:response.message
    }), { status: response.status })

}