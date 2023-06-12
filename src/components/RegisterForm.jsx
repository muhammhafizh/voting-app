import React from "react";
import { useMutation, useSubscription } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_NIM_USERS, INSERT_USER } from "../apollo/User";
import eyesOpen from "../assets/eyesopen.svg";
import eyesClosed from "../assets/eyesclosed.svg";
import warning from "../assets/warning.svg";
import { useState, useRef, useEffect } from "react";
import bcryptjs from "bcryptjs";
import { OCR } from "../utils/GetText";
import ml5 from "ml5";

function RegisterForm() {
  const [open, setOpen] = useState(true);
  const [insertUser] = useMutation(INSERT_USER);
  const { data: dataUsers, loading: loadingUsers } =
    useSubscription(GET_NIM_USERS);
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const imageRef = useRef();
  const prodi = useRef();
  const [isImage, setIsImage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageData, setImageData] = useState([]);
  var dataImage;
  const dataUsersInDB = [];

  useEffect(() => {
    let data = true;

    if (data) {
      const fileImage = document.getElementById("classific_image_id");
      if (image.length > 0) {
        // No callback needs to be passed to use Promises.
        ml5
          .imageClassifier(
            "https://teachablemachine.withgoogle.com/models/2RFDRfRIy/model.json"
          )
          .then((classifier) => classifier.predict(fileImage))
          .then((results) => {
            // Do something with the results
            imageData.push(results);
            dataImage = results;
          });
      }
    }

    return () => {
      data = false;
    };
  }, [isImage]);

  dataUsers?.mini_project_users?.map((dt) => {
    dataUsersInDB.push(dt.nim);
  });

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

    data.map((dt) => {
      if (dt.isError === true) {
        alert(`Data error pada bagian ${dt.name}`);
      }

      if (dt.value === "") {
        alert(`Silahkan masukan data pada bagian ${dt.name}`);
      }
    });

    if (image === "") {
      alert("Mohon masukan foto SIA anda");
    } else if (dataUsersInDB.includes(Number(data[1].value))) {
      alert("Data Anda sudah terdaftar");
    } else if (password === "") {
      alert("Please enter your password");
    } else {
      setTimeout(() => {
        setIsLoading(true);
      }, 1);

      setIsImage(true);

      setTimeout(async () => {
        const usernames = data[0].value.toLowerCase(),
          nim = data[1].value,
          programStudi = prodi?.current?.value,
          email = data[2].value;

        const { name, nimMahasiswa, program } = await OCR(
          image,
          usernames,
          nim,
          programStudi
        );

        // console.log(name, nimMahasiswa, program);
        // console.log(imageData[0]);

        const hashPassword = bcryptjs.hashSync(password, 10);

        if (
          name &&
          nimMahasiswa &&
          program &&
          imageData[0]?.[0]?.label === "SIA"
        ) {
          await insertUser({
            variables: {
              username: usernames,
              password: hashPassword,
              email: email,
              nim: nim,
              Prodi: programStudi,
            },
          });

          navigate("/Login");
        } else {
          alert("Mohon Masukan foto SIA anda dengan gambar yang berkualitas");
        }

        setIsImage(false);
        setIsLoading(false);
      }, 20000);
    }
  };

  return (
    <section>
      {isLoading && <h1>Hello</h1>}
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
          <div className="mx-auto text-left w-64 md:w-96">
            <select
              className="border border-gray-300 bg-gray-200 text-gray-400 w-64 md:w-96 p-3"
              ref={prodi}
            >
              <option>Masukan Prodi anda</option>
              <option value="teknik informatika">Teknik Informatika</option>
              <option value="sistem informasi">Sistem Informasi</option>
            </select>
          </div>
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
            <img src={image} id="classific_image_id" className="hidden" />
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
