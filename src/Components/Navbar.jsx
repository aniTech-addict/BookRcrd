import Link from "next/link"

const Navbar = () => {
  return (
    <div className="flex w-full justify-center items-center bg-blue-900">
        <p className=" m-3">
            Book Records
        </p>
        <Link href="/" className="m-3 hover:scale-105 hover:text-pink-200">All Books</Link>

    </div>
  )
}

export default Navbar