import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import { CHANGE_PASSWORD } from "../../apollo/User";
import { useLazyQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const nim = useRef();
  const [getData] = useLazyQuery(CHANGE_PASSWORD);
  const navigate = useNavigate();

  const sendEmail = async (e) => {
    e.preventDefault();

    const userData = await getData({
      variables: {
        nim: nim.current?.value,
      },
    });

    const { email, id, username } = userData?.data?.mini_project_users[0];

    let URL =
      window.location.href.replace("ForgotPassword", "ChangePassword/") + id;

    const templateParams = {
      user_email: email,
      to_name: username,
      message: `Please Open This URL ${URL} and change your password`,
    };

    emailjs
      .send(
        "service_uvkjigs",
        "template_lfv3e8n",
        templateParams,
        "K3f0Z-1nYTgpQJI7w"
      )
      .then(
        (result) => {
          console.log(result.text);
          alert("Please Check Your Email");
          navigate("/Login");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section>
      <div className="container mx-auto py-10 block">
        <h1 className="text-center font-bold text-2xl uppercase">
          Masukan NIM Anda
        </h1>
        <form onSubmit={sendEmail} className="text-center my-5 space-y-4">
          <div className="mt-10">
            <input
              ref={nim}
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

export default ForgotPassword;
