import { useState } from "react"
import { useNavigate } from "react-router-dom"
import hamburgerMenu from "../assets/hamburger.svg"
import { Auth } from "../utils/Auth"
import logout from "../assets/LogoutUser.svg"

function NavbarUserPage({ name }) {
    const [open, setOpen] = useState(false)
    const navigate = useNavigate()

  return (
    <header className="sticky top-0 bg-white z-50">
        <div className="container mx-auto p-3 md:flex">
            <div className="flex">
                <h1 className="font-bold text-2xl">u<span className="text-blue-300">Vote</span></h1>
                <button className="md:hidden mt-1 ml-auto" onClick={() => setOpen(!open)}>
                    <img src={hamburgerMenu} />
                </button>
            </div>
            <div className={`mt-2 mx-auto my-2 md:space-x-3 md:flex ${open ? 'space-x-0' : 'hidden'}`}>
                <a href="/User">
                    <button className="font-medium block">Home</button>
                </a>
                <a href="/User/LiveVote">
                    <button className="font-medium block mb-2 md:mb-0">Live voting</button>
                </a>
                <button onClick={() => Auth.signOut(navigate)} className="bg-red-400 px-3 py-1 text-white uppercase hover:bg-red-300 md:hidden">
                    Log Out
                </button>
            </div>
            <span className="uppercase my-2 mx-2 hidden md:inline">
                hello {name}
            </span>
            <button onClick={() => Auth.signOut(navigate)} className="hidden md:inline rounded-md cursor-pointer">
               <img src={logout} className="h-6" />
            </button>
        </div>
    </header>
  )
}

export default NavbarUserPage