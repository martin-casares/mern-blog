import { useContext } from "react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

import { UserContext } from "../UserContext";
export default function Post({
  _id,
  title,
  summary,
  cover,
  createdAt,
  author,
}) {
  const { userInfo, setUserInfo } = useContext(UserContext);
  return (
    <>
      {/* <section className="flex flex-row sm:flex-row gap-4 cursor-pointer">
        <div className="flex-[3]">
        <p className="pb-2 font-semibold capitalize">{userInfo.username}</p>
        <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
        {title}
        </h2>
        <div className="py-1 text-gray-500 line-clamp-2 leading-5">
        {summary}
        </div>
        <div className="flex items-center justify-between w-full md:w-[70%] mt-[2rem] md:mt-0">
        <p className="text-xs text-gray-600">
        <time>{format(new Date(createdAt), "MMM d, yyy HH:mm")}</time>
        </p>
        </div>

        <div className="flex-[1]">
        <img
        src={"http://localhost:4000/" + cover}
        alt="img_post"
        className="w-full h-[12rem] object-cover"
        />
        </div>
        </div>
        </section> */}

      <section className="flex flex-row sm:flex-row  gap-1 ml-5 cursor-pointer mb-[4rem] md:w-[80%] ">
        <div className="flex-[6] ">
          <h2 className="text-xl font-bold line-clamp-2 leading-6 capitalize">
            {title}
          </h2>
          <p className="pb-2 text-xs text-gray-400 capitalize">
            Author: {author.username}
          </p>
          <div className="py-1 md:pb-[5rem] text-gray-600 line-clamp-2 leading-5 md:m-0">
            {summary}
          </div>
          <div className="flex items-center justify-between  w-full md:w-[70%]  md:mt-4 ">
            <p className="text-xs text-gray-400 ">
              <time>{format(new Date(createdAt), "MMM d, yyy HH:mm")}</time>
            </p>
          </div>
        </div>
        <div className="flex-[1] sm:flex-[4]">
          <img
            src={"http://localhost:4000/" + cover}
            alt="img_post"
            className="w-[17rem] h-[10rem] object-cover mb:w-[30rem] "
          />
        </div>
      </section>
    </>
  );
}
