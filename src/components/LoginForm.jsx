import React from "react";
import { Link, useNavigate } from "react-router-dom";
import eyesOpen from "../assets/eyesopen.svg";
import eyesClosed from "../assets/eyesclosed.svg";
import { useState, useRef } from "react";
import { useLazyQuery, useSubscription, useMutation } from "@apollo/client";
import { Auth } from "../utils/Auth";
import {
  GET_DATA_FOR_LOGIN,
  GET_MAHASISWA_IN_VOTING,
  INSERT_USER_IN_VOTING,
} from "../apollo/User";
import bcryptjs from "bcryptjs";
import { PASLON_ID } from "../apollo/Paslon";

function LoginFormPage() {
  const [open, setOpen] = useState(true);
  const [getData] = useLazyQuery(GET_DATA_FOR_LOGIN);
  const [insertInVoting] = useMutation(INSERT_USER_IN_VOTING);
  const [errorMessage, setErrorMessage] = useState("");
  const { data: dataMahasiswaInVoting } = useSubscription(
    GET_MAHASISWA_IN_VOTING
  );
  const { data: dataPaslon } = useSubscription(PASLON_ID);
  const dataMahasiswa = [];
  dataMahasiswaInVoting?.mini_project_voting?.map((dt) => {
    dataMahasiswa.push(dt.user_id);
  });

  const nim = useRef();
  const password = useRef();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const getNim = nim?.current?.value;
    const changeToNumber = Number(getNim);

    const userData = await getData({
      variables: {
        nim: changeToNumber,
      },
    });

    const loginData = await userData?.data?.mini_project_users[0];

    if (loginData === undefined) {
      setErrorMessage("Anda belum terdaftar");
    }

    if (loginData?.role === "admin") {
      const checkPassword =
        password.current?.value ===
        userData.data.mini_project_users[0].password;
      if (checkPassword) {
        const dataLogin = await Auth.storeUserInfoToCookie(loginData);
        if (dataLogin.role === "admin") {
          navigate("/Admin", { replace: true });
        }
      } else {
        setErrorMessage("Silahkan masukan password yang benar");
      }
    }

    if (loginData?.role === "user") {
      const checkPassword = bcryptjs.compareSync(
        password.current?.value,
        userData.data.mini_project_users[0].password
      );
      if (checkPassword) {
        const dataLogin = await Auth.storeUserInfoToCookie(loginData);

        if (dataMahasiswa.includes(loginData.id) === false) {
          const newData = [];

          dataPaslon?.mini_project_paslon?.map((dt) => {
            newData.push({
              isUserVoted: false,
              paslon_id: dt.id,
              user_id: loginData.id,
              status_paslon: dt.jenis_paslon,
            });
          });

          const objectsData = {
            newData,
          };

          insertInVoting({
            variables: {
              objects: objectsData.newData,
            },
          });
        }

        if (dataLogin.role === "user") {
          navigate("/User", { replace: true });
        }
      } else {
        setErrorMessage("Silahkan masukan password yang benar");
      }
    }
  };

  return (
    <section>
      <div className="container mx-auto py-10 block">
        <h1 className="text-center font-bold text-2xl uppercase">Let's vote</h1>
        <form className="text-center my-5 space-y-4">
          <input
            ref={nim}
            placeholder="Nim"
            className="border border-gray-300 bg-gray-200 text-gray-400 focus:outline-none focus:border-sky-500 focus:bg-white focus:text-black w-64 md:w-96 p-3"
          />
          <br />
          <div className="mx-auto border border-gray-300 bg-gray-200 text-gray-400 w-64 md:w-96 py-3 px-3 text-left flex">
            <input
              ref={password}
              name="userPassword"
              type={open ? "password" : "text"}
              placeholder="Password"
              className="bg-gray-200 border border-gray-200 focus:outline-none focus:text-black"
            />
            <img
              onClick={() => setOpen(!open)}
              src={open ? eyesClosed : eyesOpen}
              className="ml-auto bg-gray-200 w-8"
            />
          </div>
          <br />
          <div className="mt-10">
            <Link to="">
              <button
                onClick={(e) => handleSubmit(e)}
                className="p-3 w-64 md:w-96 bg-white border border-green-700 text-green-500 rounded hover:bg-green-800 hover:text-white"
              >
                Log In
              </button>
            </Link>
          </div>
          <div className="mt-3">
            <span className="">
              <a className="text-red-600 font-medium" href="/ForgotPassword">
                Forgot Your Password ?
              </a>
            </span>
          </div>
          <div className="mt-5 space-y-1">
            <span className="text-red-400">{errorMessage}</span>
          </div>
        </form>
      </div>
    </section>
  );
}

export default LoginFormPage;
