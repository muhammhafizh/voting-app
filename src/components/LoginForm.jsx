import { Link, useNavigate } from "react-router-dom"
import eyesOpen from "../assets/eyesopen.svg"
import eyesClosed from "../assets/eyesclosed.svg"
import { useState, useRef } from "react"
import { useLazyQuery } from "@apollo/client"
import { Auth } from "../utils/Auth"
import { GET_DATA_FOR_LOGIN } from "../apollo/User"
import bcryptjs from "bcryptjs"

function LoginFormPage() {
  const [open, setOpen] = useState(true)
  const [ getData ] = useLazyQuery(GET_DATA_FOR_LOGIN)
  const [ errorMessage, setErrorMessage ] = useState("")

  const username = useRef()
  const password = useRef()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const userData = await getData({
      variables: {
        username: username.current?.value,
      }
    })

    const checkPassword = bcryptjs.compareSync(password.current?.value, userData.data.mini_project_users[0].password)

    if (checkPassword === false){
      setErrorMessage("Silahkan masukan username dan password yang benar")
    }

    const loginData = await userData.data.mini_project_users[0]

    
    const dataLogin = await Auth.storeUserInfoToCookie(loginData)

    if (dataLogin.role === 'user') {
      navigate('/User', { replace: true })
    } else {
      navigate('/Admin', { replace: true })
    }
  }  

  return (
    <section>
        <div className="container mx-auto py-10 block">
            <h1 className="text-center font-bold text-2xl uppercase">Let's vote</h1>
            <form className="text-center my-5 space-y-4">
                <input ref={username} placeholder="Username" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black w-64 md:w-96 p-3" />
                <br />
                <div className="mx-auto border border-gray-300 bg-gray-200 text-gray-400 w-64 md:w-96 py-3 px-3 text-left flex">
                  <input ref={password} name='userPassword' type={open ? "password" : "text" } placeholder="Password" className="bg-gray-200 border border-gray-200 focus:outline-none focus:text-black" />
                  <img onClick={() => setOpen(!open)} src={open ? eyesClosed : eyesOpen} className="ml-auto bg-gray-200 w-8" />
                </div>
                <br />
                <div className="mt-10">
                  <Link to="">
                    <button onClick={(e) => handleSubmit(e)} className="p-3 w-64 md:w-96 bg-white border border-green-700 text-green-500 rounded hover:bg-green-800 hover:text-white">Log In</button>
                  </Link>
                </div>
                <div className="mt-5 space-y-1">
                    <span className="text-red-400">{errorMessage}</span>
                </div>
            </form>
        </div>
    </section>
  )
}

export default LoginFormPage