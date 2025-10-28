import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex w-full justify-center items-center bg-blue-900">
        <p className=" m-3">
            Book Records
        </p>
        <Link href="/public" className="m-3 hover:scale-105 hover:text-pink-200">All Books</Link>
        <Link href="/add" className="m-3 hover:scale-105 hover:text-pink-200">Add Book</Link>

    </div>
  )
}

export default Navbar