import Book from "@/Lib/Models/Books.model";

export async function postBooks(data){
    // **DATA VALIDATION** is bring done in route.js file during post req, 
    // reducing unnecessary database call  
    try{
        const newBook = await Book.create(data);
        await newBook.save();
        
    }catch(err){
        console.log("⚠️ Error creating book instance in DataBase\n",err);
    }
}