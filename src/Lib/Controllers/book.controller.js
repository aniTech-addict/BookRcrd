import BOOK from "@/Lib/Models/Books.model";

function validData(data){
    if(!data.title || !data.author || !data.genre || !data.publicationDate){
        return false
    }
    return true
}

export async function postBooks(data){
    // migration of logic in controller to keep things PROFESSIONAL HEUHEUE
    if (!validData(data)){
        return {
            status:404,
            message:"some Values are missing"
        }
    }

    try{
        const newBook = await BOOK.create(data);
        await newBook.save();

        return {
            status:201,
            message:"Book Created Successfully",
        }

    } catch ( err ){
        console.log("⚠️ Error creating book instance in DataBase\n",err);
        return {
            status:500,
            message:"Internal Server Error",
            error:err
        }
    }
}

export async function getBooks(){
    try{
        const Books = await BOOK.find()
        return {
            data : Books,
            status : 200
        }
    } catch (err) {
        return {
            status: 500,
            message: "⚠️ Error encounter in Books Controller",
            error: err
        };
    }
}