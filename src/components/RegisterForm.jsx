import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { INSERT_USER } from "../apollo/User";
import eyesOpen from "../assets/eyesopen.svg";
import eyesClosed from "../assets/eyesclosed.svg";
import warning from "../assets/warning.svg";
import { useEffect, useState, useRef } from "react";
import bcryptjs from "bcryptjs";
import { OCR } from "../utils/GetText";
import * as ml5 from "ml5";
import * as mobilenet from "@tensorflow-models/mobilenet";

function RegisterForm() {
  const [open, setOpen] = useState(true);
  const [insertUser] = useMutation(INSERT_USER);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const imageRef = useRef();

  useEffect(() => {
    async function setup() {
      // let imageModelURL =
      //   "https://teachablemachine.withgoogle.com/models/GoWMynpAh/model.json";
      let classifier = await ml5.imageClassifier("MobileNet");
      console.log(classifier);
    }
    setup();
  }, []);

  const baseData = [
    {
      name: "name",
      value: "",
      errorPart: "name",
      isError: false,
      message: "",
      type: "text",
    },
    {
      name: "nim",
      value: "",
      errorPart: "nim",
      isError: false,
      message: "",
      type: "text",
    },
    {
      name: "email",
      value: "",
      errorPart: "email",
      isError: false,
      message: "",
      type: "email",
    },
  ];

  const [password, setPassword] = useState("");
  const [data, setData] = useState(baseData);
  const nameRegex = /^[A-Za-z ]+$/;
  const nimRegex = /^[0-9]*$/;
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  const handleChange = (e, index) => {
    const name = e.target.name;
    const value = e.target.value;

    const newData = [...data];

    if (name === "name") {
      newData[index].value = value;
      if (nameRegex.test(value) || value === "") {
        (newData[index].isError = false), (newData[index].message = "");
      } else {
        (newData[index].isError = true),
          (newData[index].message = "Nama Harus Berupa Huruf");
      }
    }

    if (name === "nim") {
      newData[index].value = value;
      if (nimRegex.test(value) || value === "") {
        (newData[index].isError = false), (newData[index].message = "");
      } else {
        (newData[index].isError = true),
          (newData[index].message = "Nim harus berupa nomor");
      }
    }

    if (name === "email") {
      newData[index].value = value;
      if (emailRegex.test(value) || value === "") {
        (newData[index].isError = false), (newData[index].message = "");
      } else {
        (newData[index].isError = true),
          (newData[index].message = "Silahkan masukan email yang benar");
      }
    }

    setData(() => [...newData]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(image);
    //await OCR(image);
    //classifyImg(imageRef.current);
    // data.map((dt) => {
    //   if (dt.isError === true) {
    //     alert(`Data error pada bagian ${dt.name}`);
    //   }

    //   if (dt.value === "") {
    //     alert(`Silahkan masukan data pada bagian ${dt.name}`);
    //   }
    // });

    // if (password === "") {
    //   alert("Please enter your password");
    // }

    // const hashPassword = bcryptjs.hashSync(password, 10);

    // await insertUser({
    //   variables: {
    //     username: data.name,
    //     password: hashPassword,
    //   },
    // });

    // navigate("/Login");
  };

  return (
    <section>
      <div className="container mx-auto py-10 block">
        <h1 className="text-center font-bold text-2xl uppercase">
          welcome to u<span className="text-blue-300">vote</span>
        </h1>
        <form className="text-center my-5 space-y-4">
          {data.map((dt, index) => {
            return (
              <div
                key={index}
                className={`mx-auto border border-gray-300 ${
                  dt.isError ? "bg-red-400" : "bg-gray-200"
                } w-64 md:w-96 p-3 text-left flex`}
              >
                <input
                  value={dt.value}
                  name={dt.name}
                  type={dt.type}
                  placeholder={dt.name}
                  className={` ${
                    dt.isError
                      ? "bg-red-400 focus:text-white"
                      : "bg-gray-200 focus:text-black"
                  } focus:outline-none`}
                  onChange={(e) => handleChange(e, index)}
                />
                {dt.name === dt.errorPart && dt.isError === true && (
                  <img
                    className="w-5 ml-auto"
                    src={warning}
                    title={dt.message}
                  />
                )}
              </div>
            );
          })}

          <div className="mx-auto border border-gray-300 bg-gray-200 text-gray-400 w-64 md:w-96 p-3 text-left flex">
            <input
              value={password}
              name="userPassword"
              onChange={(e) => setPassword(e.target.value)}
              type={open ? "password" : "text"}
              placeholder="password"
              className="bg-gray-200 border border-gray-200 focus:outline-none focus:text-black"
            />
            <img
              onClick={() => setOpen(!open)}
              src={open ? eyesClosed : eyesOpen}
              className="ml-auto bg-gray-200 w-8"
            />
          </div>
          <div className="mx-auto text-left w-64 md:w-96">
            <input
              className="block w-full text-sm text-slate-500 mt-3 
              file:mr-4 file:py-2 file:px-4
              file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-200 file:text-gray-400
              hover:file:bg-gray-300"
              id="file_input"
              type="file"
              title="Upload KTM / SIA"
              accept="image/*"
              onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
              ref={imageRef}
            />
          </div>
          <div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="p-3 w-64 md:w-96 bg-blue-500 text-white rounded hover:bg-blue-800"
            >
              Register
            </button>
          </div>
          <div className="my-5">
            <span className="">
              <a className="text-green-600 font-semibold" href="/Login">
                Log in
              </a>{" "}
              if you already have an account
            </span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default RegisterForm;
