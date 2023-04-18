import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../../utils/Auth";
import home from "../../assets/home.svg";
import candidate from "../../assets/Candidate.svg";
import users from "../../assets/Users.svg";
import admin from "../../assets/Admin.svg";
import control from "../../assets/control.png";
import logout from "../../assets/LogoutAdmin.svg";

function SidebarPage() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Home", src: home, element: "Admin" },
    { title: "Candidate", src: candidate, element: "Admin/Candidate" },
    { title: "Data Mahasiswa", src: users, element: "Admin/Users" },
  ];

  const path = window.location.pathname;

  return (
    <div
      className={` ${
        open ? "w-full md:w-72" : "w-20 "
      } bg-slate-900 h-screen p-5 pt-8 duration-300 sticky`}
    >
      <img
        src={control}
        className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      <div className="flex gap-x-4 items-center">
        <img
          src={admin}
          className={`cursor-pointer duration-500 h-8 ${
            open && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-left font-medium text-xl duration-200 ${
            !open && "scale-0"
          }`}
        >
          Admin
        </h1>
      </div>
      <ul className="pt-9 mt-9">
        {Menus.map((Menu, index) => (
          <a href={`/${Menu.element}`} key={index}>
            <li
              className={
                path.substring(1) === Menu.title
                  ? "flex rounded-md p-2 cursor-pointer bg-slate-400 text-white text-sm items-center gap-x-4 mt-2"
                  : "flex rounded-md p-2 cursor-pointer hover:bg-slate-400 hover:text-white text-gray-300 text-sm items-center gap-x-4 mt-2"
              }
            >
              <img src={Menu.src} className="h-6" />
              <span className={`${!open && "hidden"} origin-left duration-200`}>
                {Menu.title}
              </span>
            </li>
          </a>
        ))}
      </ul>
      <button
        onClick={() => Auth.signOut(navigate)}
        className="mt-20 flex rounded-md p-2 cursor-pointer hover:bg-blue-400 hover:text-white text-gray-300 text-sm items-center gap-x-4 mt-2'"
      >
        <img src={logout} className="h-6" />
        <span className={`${!open && "hidden"} origin-left duration-200`}>
          Log Out
        </span>
      </button>
    </div>
  );
}

export default SidebarPage;
