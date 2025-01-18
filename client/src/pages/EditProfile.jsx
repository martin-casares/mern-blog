import { useEffect, useRef, useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import Modal from "../utils/Modal";

export default function EditProfile({ editModal, setEditModal, userInfo }) {
  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const [form, setForm] = useState({
    id: "",
    username: "",
    userImg: "",
    bio: "",
    email: "",
  });

  const [errors, setErrors] = useState({});
  const btn = "border border-green-600 py-2 px-5 rounded-full text-green-600";

  const openFile = () => {
    imgRef.current.click();
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = "Username is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (userInfo) {
      setForm({
        id: userInfo.id || "",
        username: userInfo.username || "",
        bio: userInfo.bio || "",
        userImg: imgUrl || "",
        email: userInfo.email || "",
      });
    } else {
      setForm({ username: "", bio: "", userImg: "", email: "" });
    }
  }, [userInfo]);

  // save form
  const saveForm = async (ev) => {
    ev.preventDefault();
    if (!validateForm()) return;
    const data = new FormData();
    data.append("userImg", form.userImg);
    data.append("id", userInfo.id);
    data.append("username", form.username);
    data.append("email", form.username);
    data.append("bio", form.bio);

    try {
      const response = await fetch("http://localhost:4000/auth/updateProfile", {
        method: "PUT",
        body: data,
        credentials: "include",
      });

      if (response.ok) {
        setEditModal(false);
      } else {
        const errorData = await response.json();
        console.error("Error updating post: ", errorData);
      }
    } catch (error) {
      console.log(error);
    }

    console.log("Form saved", form);
  };

  return (
    <Modal modal={editModal} setModal={setEditModal}>
      <div className="center w-[95%] md:w-[45rem] bg-white mx-auto shadows my-[1rem] z-20 mb-[3rem] p-[2rem]">
        {/* head */}
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-xl">Profile information</h2>
          <button className="text-xl">
            <LiaTimesSolid />
          </button>
        </div>
        {/* body */}
        <section className="mt-6">
          <p className="pb-3 text-sm text-gray-500">Photo</p>
          <div className="flex gap-[2rem]">
            <div className="w-[5rem]">
              <img
                alt="profile-img"
                src={
                  imgUrl // Si el usuario selecciona una nueva imagen, usa esa URL temporal
                    ? imgUrl
                    : userInfo.userImg // Si no hay una nueva imagen, usa la que viene de la base de datos
                      ? `http://localhost:4000/${userInfo.userImg}`
                      : "/profile.jpg" // Imagen predeterminada si no hay ninguna
                }
                className="min-h-[5rem] min-w-[5rem] object-cover border border-gray-400 rounded-full"
              />
              <input
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setImgUrl(URL.createObjectURL(file));
                    setForm({ ...form, userImg: file });
                  }
                }}
                accept="image/jpg, image/png, image/jpeg"
                ref={imgRef}
                type="file"
                hidden
              />
            </div>
            <div>
              <div className="flex gap-4 text-sm">
                <button onClick={openFile} className="text-green-600">
                  Update
                </button>
                <button
                  onClick={() => {
                    setImgUrl("");
                    setForm({ ...form, userImg: "" });
                  }}
                  className="text-red-600"
                >
                  Remove
                </button>
              </div>
              <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                In mollis nunc sed id semper risus in hendrerit gravida rutrum
                quisque non tellus orci, ac auctor augue mauris augue!
              </p>
            </div>
          </div>
        </section>
        {/* Form */}
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor="username">
            Name*
          </label>
          <input
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            value={form.username}
            type="text"
            placeholder="Username..."
            className="p-1 border-b border-gray-400 w-full outline-none"
            maxLength={50}
          />
          {errors.username && (
            <p className="text-red-600 text-xs">{errors.username}</p>
          )}
          <small className="text-sm-[0.2rem] text-gray-600 pt-2">
            Erat nam at lectus urna duis convallis convallis tellus, id.
          </small>
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor="email">
              Email*
            </label>
            <input
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              value={form.email}
              type="email"
              placeholder="Email..."
              className="p-1 border-b border-gray-400 w-full outline-none"
              maxLength={50}
            />
            {errors.email && (
              <p className="text-red-600 text-xs">{errors.email}</p>
            )}
            <small className="text-sm-[0.2rem] text-gray-600 pt-2">
              Erat nam at lectus urna duis convallis convallis tellus, id.
            </small>
          </section>
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor="bio">
              Bio*
            </label>
            <input
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              value={form.bio}
              type="text"
              placeholder="bio..."
              className="p-1 border-b border-gray-400 w-full outline-none"
              maxLength={50}
            />
            <small className="text-sm-[0.2rem] text-gray-600 pt-2">
              Erat nam at lectus urna duis convallis convallis tellus, id.
            </small>
          </section>
        </section>
        {/* Footer */}
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button onClick={() => setEditModal(false)} className={btn}>
            Cancel
          </button>
          <button
            onClick={saveForm}
            className={`${btn} bg-green-800 text-white`}
          >
            Save
          </button>
        </div>
      </div>
    </Modal>
  );
}
