import { useState } from "react"
import hamburgerMenu from "../assets/hamburger.svg"

function NavbarHome() {
    const [open, setOpen] = useState(false)

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
                <a href="#home">
                    <button className="font-medium block">Home</button>
                </a>
                <a href="#mission">
                    <button className="font-medium block my-1 md:my-0">Mission</button>
                </a>
                <a href="#contact">
                    <button className="font-medium block mb-2 md:mb-0">Contact Us</button>
                </a>
                <a href="/register">
                    <button className="bg-blue-400 px-3 py-1 text-white uppercase hover:bg-blue-300 md:hidden">Get started</button>
                </a>
            </div>
            <a href="/register">
                <button className="bg-blue-400 px-3 py-1 text-white uppercase hover:bg-blue-300 hidden md:inline">
                    Get started
                </button>
            </a>
        </div>
    </header>
  )
}

export default NavbarHome