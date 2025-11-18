import { PlusIcon } from "lucide-react"
import { Link } from "react-router"

const Navbar = () => {
  return (
    <div className="bg-base-100 border-b border-base-content/10">
      <div className="mx-auto p-4 max-w-6xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-primary font-Cabin tracking-tighter">
            ToMind
          </h1>
          <div className="flex items-center">
            <Link to={"/create"} className="btn btn-primary rounded" >
             <PlusIcon className="size-5"/>
             <span>New Note</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar