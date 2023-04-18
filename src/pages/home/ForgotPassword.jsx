import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function ForgotPassword() {
  const email = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    let URL = window.location.href.match(/login/g)
      ? window.location.href.replace("Login", "Forgot_Password")
      : window.location.href + "/Forgot_Password";

    const templateParams = {
      user_email: email.current?.value,
      to_name: "hafizh",
      message: `Open This URL ${URL}`,
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
          Input Your Email
        </h1>
        <form onSubmit={sendEmail} className="text-center my-5 space-y-4">
          <div className="mt-10">
            <input
              ref={email}
              type="email"
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
