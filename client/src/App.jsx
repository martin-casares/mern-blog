import { Routes, Route } from "react-router-dom";
import Post from "./components/Post";
import Layout from "./Loyout";
import IndexPage from "./pages/IndexPage";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import RequireAuth from "./components/RequireAuth";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          /* Rutas protegidas */
          <Route element={<RequireAuth />}>
            <Route path="/create" element={<CreatePost />} />
            <Route path="/edit/:id" element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
