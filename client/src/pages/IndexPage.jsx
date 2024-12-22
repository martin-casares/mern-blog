import { useState, useEffect } from "react";

import Post from "../components/Post";
import Hero from "../components/Hero";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts);
      });
    });
  }, []);

  console.log(posts);
  return (
    <>
      <Hero />
      <section className="flex flex-col sm:flex-row gap-4 cursor-pointer mx-[5rem] mt-[5rem]">
        <div className="flex-[7] flex-col gap-[2.5rem] mb-2">
          {posts.length > 0 &&
            posts.map((post) => <Post key={post._id} {...post} />)}
        </div>
        {/* Sección adicional: Información lateral */}
        <aside className="flex-[3] pl-4 border-l border-gray-300">
          <h3 className="text-lg font-bold">Sección Adicional</h3>
          <p className="text-gray-600 text-sm">
            At augue eget arcu dictum varius duis at consectetur lorem donec
            massa sapien, faucibus et molestie ac, feugiat sed lectus!
          </p>
          <ul className="pt-4 text-sm text-gray-800">
            <li>- Enlace 1</li>
            <li>- Enlace 2</li>
            <li>- Enlace 3</li>
          </ul>
        </aside>
      </section>
    </>
  );
}
