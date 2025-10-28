function validData(data){
    if(!data.title || !data.author || !data.genre || !data.publicationDate){
        return false
    }
    return true
}

export function POST(req){
    if (!validData(req.data)){
        return Response({
            status:404,
            message:"some Values are missing"
        })
    }

    
    return new Response(JSON.stringify({data:"Added"}), {
        status: 201,
        headers: {
            "Content-Type": "application/json",
        }
    })
}