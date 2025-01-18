import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LiaEditSolid } from "react-icons/lia";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { CiSearch } from "react-icons/ci";

import { UserContext } from "../UserContext";
import { Auth } from "./Auth/Auth";
import Search from "../utils/Search";
import Modal from "../utils/Modal";
import UserModal from "./UserModal";

export default function Header() {
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const scrollMe = () => {
      window.scrollY > 50 ? setIsActive(true) : setIsActive(false);
    };
    window.addEventListener("scroll", scrollMe);
  }, []);

  return (
    <header
      className={`absolute border-b border-black sticky top-0 z-50
    ${isActive ? "bg-white" : "bg-banner"} transition-all duration-500 `}
    >
      <div className="size h-[70px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="h-[1.5rem] font-bold text-3xl">
            Blog
          </Link>
          <div className="hidden lg:block transition-all duration-500">
            <div className="flex items-center gap-1 border border-gray-500 rounded-full p-1 mt-2">
              <span className="">
                <CiSearch className="text-2xl text-gray-500  " />
              </span>
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent outline-none pt-[0.1rem]"
              />
            </div>
          </div>
        </div>
        <nav className="flex  items-center gap-5">
          {userInfo ? ( // Si hay userInfo, muestra las opciones de usuario autenticado
            <>
              <div className="lg:hidden">
                <Search />
              </div>
              <div className="flex items-center gap-3 sm:gap-7">
                <Link
                  to="/create"
                  className="hidden md:flex items-center gap-1 text-gray-500"
                >
                  Write
                  <span className="text-2xl mb-1">
                    <LiaEditSolid />
                  </span>
                </Link>
                <span className="text-2xl text-gray-500 cursor-pointer">
                  <IoMdNotificationsOutline />
                </span>
                <div className="flex items-center relative">
                  <img
                    onClick={() => setModal(true)}
                    className="w-[2.3rem] wr-[2.3rem] object-cover rounded-full cursor-pointer"
                    src={
                      userInfo.userImg
                        ? `http://localhost:4000/${userInfo.userImg}`
                        : "/profile.jpg"
                    }
                    alt="profile-img"
                  />
                  <span className="text-gray-500 cursor-pointer">
                    <MdKeyboardArrowDown />
                  </span>
                  <Modal modal={modal} setModal={setModal}>
                    <UserModal setModal={setModal} />
                  </Modal>
                </div>
              </div>
            </>
          ) : (
            // Si no hay userInfo, muestra las opciones de login/registro
            <>
              <div className="flex gap-5">
                <Link>About</Link>
                <Link>dos</Link>
                <Link>Contact</Link>
              </div>
              <button
                onClick={() => setModal(true)}
                className="bg-black text-white rounded-full px-5 p-2 text-sm font-bold"
              >
                Login
              </button>
              <Auth modal={modal} setModal={setModal} />
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
