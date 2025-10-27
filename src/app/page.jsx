"use client"

import { useState, useEffect } from "react";
import axios from "axios";


const HomePage = () => {

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        setBooks(response.data.data);

        console.log(response.data)
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };
    fetchBooks();
  }, []);
  
  return (
    <>
      <div>
        <h1 className="block text-center mt-4 text-4xl">Books</h1>
      </div>
      <main>
        <section>
          {books.map((book) => (
            <div key={book.id} className="flex flex-col gap-2 bg-gray-800 p-4 rounded-lg shadow-md mb-4 text-white">
              <h3 className="text-xl font-bold">{book.title}</h3>
              <p className="text-gray-300">Author: {book.author}</p>
              <p className="text-gray-300">Genre: {book.genre}</p>
            </div>
          ))}

          
        </section>
      </main>
    </>
  )
}

export default HomePage;
