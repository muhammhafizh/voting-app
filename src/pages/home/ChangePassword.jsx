import React, { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { UPDATE_PASSWORDS } from "../../apollo/User";
import bcryptjs from "bcryptjs";

function ChangePassword() {
  const { id } = useParams();
  const newPassword = useRef();
  const navigate = useNavigate();
  const [insertUser] = useMutation(UPDATE_PASSWORDS);

  const updatePassword = async (e) => {
    e.preventDefault();

    if (newPassword?.current?.value === "") {
      alert("Masukan password baru anda");
    }

    const hashPassword = bcryptjs.hashSync(newPassword?.current?.value, 10);

    const newData = await insertUser({
      variables: {
        id: id,
        password: hashPassword,
      },
    });

    if (newData?.data?.update_mini_project_users?.returning?.[0]) {
      alert("Password Berhasil di ganti");
      navigate("/Login");
    }
  };

  return (
    <section>
      <div className="container mx-auto py-10 block">
        <h1 className="text-center font-bold text-2xl uppercase">
          Masukan password baru anda
        </h1>
        <form onSubmit={updatePassword} className="text-center my-5 space-y-4">
          <div className="mt-10">
            <input
              ref={newPassword}
              type="text"
              name="user_email"
              className="border-solid border-2 border-indigo-600"
            />
            <input
              type="submit"
              value="Send"
              className="bg-blue-500 hover:bg-blue-300 text-white ml-6 px-3 py-1"
            />
          </div>
        </form>
      </div>
    </section>
  );
}

export default ChangePassword;
