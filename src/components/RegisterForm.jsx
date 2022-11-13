import { useMutation } from "@apollo/client"
import { Link, useNavigate } from "react-router-dom"
import { INSERT_USER } from "../apollo/User"
import eyesOpen from "../assets/eyesopen.svg"
import eyesClosed from "../assets/eyesclosed.svg"
import { useState } from "react"
import bcryptjs from "bcryptjs"

function RegisterForm() {
  const [open, setOpen] = useState(true)
  const [ insertUser ] = useMutation(INSERT_USER)
  const navigate = useNavigate()

  const baseData = {
    name: "",
    userPassword: ""
  }

  const [data, setData] = useState(baseData)
  const [errorMessage, setErrorMessage] = useState(" ")
  const nameRegex = /^[A-Za-z ]+$/

  const handleChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    if (name === "name"){
      if (nameRegex.test(value)) {
        setErrorMessage(" ")
      } else {
        setErrorMessage("Nama Harus Berupa Huruf")
      }
    }

    setData({
      ...data,
      [name]: value
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()

    const hashPassword = bcryptjs.hashSync(data.userPassword, 10);

    await insertUser({
      variables: {
        username: data.name,
        password: hashPassword
      }
    })
    
    navigate("/Login")
  }

  return (
    <section>
        <div className="container mx-auto py-10 block">
            <h1 className="text-center font-bold text-2xl uppercase">welcome to u<span className="text-blue-300">vote</span></h1>
            <form className="text-center my-5 space-y-4">
                <input value={data.name} name='name' type="text" placeholder="Username" className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:text-black w-64 md:w-96 p-3" onChange={handleChange} />
                <br />
                <span className="text-red-400 text-xs">{errorMessage}</span>
                <br />
                <div className="mx-auto border border-gray-300 bg-gray-200 text-gray-400 w-64 md:w-96 py-3 px-3 text-left flex">
                  <input value={data.userPassword} name='userPassword' onChange={handleChange} type={open ? "password" : "text" } placeholder="Password" className="bg-gray-200 border border-gray-200 focus:outline-none focus:text-black" />
                  <img onClick={() => setOpen(!open)} src={open ? eyesClosed : eyesOpen} className="ml-auto bg-gray-200 w-8" />
                </div>
                <br />
                <div>
                  <button onClick={(e) => handleSubmit(e)} className="p-3 w-64 md:w-96 bg-blue-500 text-white rounded hover:bg-blue-800">Register</button>
                </div>
                <div className="my-5">
                  <span className="">Log in if you already have an account</span>
                </div>
                <div>
                  <Link to="/Login">
                    <button className="p-3 w-64 md:w-96 bg-white border border-green-700 text-green-500 rounded hover:bg-green-800 hover:text-white">Log In</button>
                  </Link>
                </div>
            </form>
        </div>
    </section>
  )
}

export default RegisterForm