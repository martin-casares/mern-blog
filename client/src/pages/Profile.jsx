import { useState, useContext } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { IoSettingsSharp } from "react-icons/io5";

import { UserContext } from "../UserContext";

export default function Profile() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const activities = [
    { title: "Home", comp: "ProfileHome" },
    { title: "Lists", comp: "ProfileLists" },
    { title: "About", comp: "ProfileAbout" },
  ];

  const discoverActions = [
    "Help",
    "Status",
    "Writers",
    "Blog",
    "Careers",
    "Privacy",
    "Terms",
    "About",
    "Teams",
  ];

  const [currentActive, setCurrentActive] = useState(activities[0]);
  const [modal, setModal] = useState(false);

  return (
    <section className="size flex gap-[4rem] relative">
      {/* User Activities */}
      <div className="mt-[9rem] flex-[2]">
        <div className="flex items-end gap-4">
          <h2 className="text-3xl sm:text-5xl font-bold capitalize">
            {userInfo.username}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm">Followers(3)</p>
          <p className="text-gray-500 text-xs sm:text-sm">Followings(4)</p>
        </div>
        <div className="flex items-center gap-5 mt-[1rem] border-b border-gray-300 mb-[3rem]">
          {activities.map((item, i) => (
            <div
              className={`py-[0.5rem] ${
                item.title === currentActive.title
                  ? "border-b border-gray-500"
                  : ""
              }`}
              key={i}
            >
              <button onClick={() => setCurrentActive(item)}>
                {item.title}
              </button>
            </div>
          ))}
        </div>
        {currentActive.comp}
      </div>

      {/* Button to open the sidebar */}
      <button
        className="fixed top-[8rem] right-0 w-[2rem] h-[2rem] bg-black text-white grid place-items-center md:hidden"
        onClick={() => setModal(true)}
      >
        <IoSettingsSharp />
      </button>

      {/* User Details Modal */}
      <div
        className={`fixed z-10 right-0 top-[4rem] bottom-0 w-[18rem] bg-white border-l border-gray-300 p-[2rem]
          ${modal ? "translate-x-0" : "translate-x-full"} 
          transition-transform duration-500 md:translate-x-0 lg:w-[30rem]`}
      >
        {/* Close button visible only on small screens */}
        <div className="pb-4 text-right md:hidden">
          <button onClick={() => setModal(false)}>
            <LiaTimesSolid />
          </button>
        </div>
        {/* Profile details */}
        <div className="sticky top-7 flex flex-col justify-between">
          <img
            className="w-[3.5rem] h-[3.5rem] object-cover rounded-full"
            alt="profile-img"
            src={userInfo.img || "/profile.jpg"}
          />
          <h2 className="py-2 font-bold capitalize">{userInfo.username}</h2>
          <p className="text-gray-500 first-letter:uppercase text-sm">
            Id volutpat lacus laoreet non curabitur gravida arcu ac tortor!
          </p>
          <button className="text-green-700 pt-6 text-sm w-fit">
            Edit Profile
          </button>
          {/* Navigation */}
          <div className="flex-[1] flex items-center flex-wrap gap-3 pt-8">
            {discoverActions.map((item, i) => (
              <button
                key={i}
                className="text-xs text-gray-500 hover:text-black cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
