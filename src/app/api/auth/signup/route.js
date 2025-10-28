import postUser from "@/Lib/Controllers/user.controller";
export async function POST(req){
    const data = req.json();
    const response = await postUser(data);

    if(response.status === 404){
        return new Response({
            status:404,
            message:"Error Occurred",
            error:response.error
        })
    }
    
    return new Response({
        status:201,
        message:"User registered"
    })
    
}