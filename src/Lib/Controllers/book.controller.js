import Book from "@/Lib/Models/Books.model";

function validData(data){
    if(!data.title || !data.author || !data.genre || !data.publicationDate){
        return false
    }
    return true
}
export async function postBooks(data){
    // migration of logic in controller to keep things PROFESSIONAL HEUHEUE
    if (!validData(req.data)){
        return response={
            status:404,
            message:"some Values are missing"
        }
    }

    try{    
        const newBook = await Book.create(data);
        await newBook.save();

        return response={
            status:201,
            message:"Book Created Successfully",
        }

    } catch ( err ){
        console.log("⚠️ Error creating book instance in DataBase\n",err);
        return response={
            status:500,
            message:"Internal Server Error",
            error:err
        }
    }
}