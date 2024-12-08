import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaUserSolid } from "react-icons/lia";
import { MdOutlineLocalLibrary } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { HiOutlineChartBar } from "react-icons/hi";
import { LiaEditSolid } from "react-icons/lia";

import { UserContext } from "../UserContext";
import secretEmail from "../utils/helper.js";

export default function UserModal({ setModal }) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const userModal = [
    {
      title: "Profile",
      icon: <LiaUserSolid />,
      path: `/profile/${userInfo?.id}`,
    },
    {
      title: "Library",
      icon: <MdOutlineLocalLibrary />,
      path: "/library",
    },
    {
      title: "Stories",
      icon: <BiSpreadsheet />,
      path: "/stories",
    },
    {
      title: "Stats",
      icon: <HiOutlineChartBar />,
      path: "/stats",
    },
  ];

  function logout() {
    fetch("http://localhost:4000/auth/logout", {
      credentials: "include",
      method: "POST",
    }).then(() => {
      setUserInfo(null); // Al hacer logout, también actualiza el estado en el contexto
      setModal(false);
      navigate("/");
    });
  }

  return (
    <section className="absolute top-[100%] right-0 w-[18rem] p-6 bg-white shadows rounded-md  text-gray-500 mt-[4.5rem] ">
      <Link
        to="/create"
        onClick={() => setModal(false)}
        className="flex md:hidden items-center gap-2 text-gray-500 pb-3"
      >
        <span className="text-2xl mb-1">
          <LiaEditSolid />
        </span>
        <span className="mt-1 ">Write</span>
      </Link>
      <div className="flex flex-col gap-4 border-b border-gray-300 pb-5">
        {userModal.map((link, i) => (
          <Link
            onClick={() => setModal(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-black/70"
            key={i}
            to={link.path}
          >
            <span className="text-2xl">{link.icon}</span>
            <h2 className="text-md">{link.title}</h2>
          </Link>
        ))}
      </div>
      <button
        onClick={logout}
        className="flex flex-col pt-5 px-1 cursor-pointer hover:text-black/70"
      >
        Sign Out
        <span>{secretEmail(userInfo?.email)}</span>
      </button>
    </section>
  );
}
