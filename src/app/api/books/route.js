let books = [
    {
        id:1,
        title: "Book 1",
        author: "Author 1",
        genre: "Genre 1",
        publicationDate: "2023-01-01",
    },
    {
        id:2,
        title: "Book 2",
        author: "Author 2",
        genre: "Genre 2",
        publicationDate: "2023-02-01",
    },
    {
        id:3,
        title: "Book 3",
        author: "Author 3",
        genre: "Genre 3",
        publicationDate: "2023-03-01",
    },
]

export async function GET(req) {
    return new Response(JSON.stringify({data:books}), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        }
    })
}