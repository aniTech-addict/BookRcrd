import { createUser } from "@/Lib/Controllers/user.controller";
export async function POST(req){
    const data = await req.json();
    const response = await createUser(data);

    if(response.status === 400 || response.status === 404 || response.status === 409){
        return new Response(JSON.stringify({
            status:response.status,
            message:response.message,
            error:response.error || response.message
        }), { status: response.status })
    }

    return new Response(JSON.stringify({
        status:201,
        message:response.message,
        token:response.token,
    }), { status: 201 })

}