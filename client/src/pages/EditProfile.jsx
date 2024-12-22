import { useRef, useState } from "react";
import Modal from "../utils/Modal";
import { LiaTimesSolid } from "react-icons/lia";

export default function EditProfile({ editModal, setEditModal }) {
  const imgRef = useRef(null);
  const [imgUrl, setImgUrl] = useState("");
  const btn = "border border-green-600 py-2 px-5 rounded-full text-green-600";

  const openFile = () => {
    imgRef.current.click();
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
                src={imgUrl ? imgUrl : "/profile.jpg"}
                className="min-h-[5rem] min-w-[5rem] object-cover border border-gray-400 rounded-full"
              />
              <input
                onChange={(e) =>
                  setImgUrl(URL.createObjectURL(e.target.files[0]))
                }
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
                <button className="text-red-600">Remove</button>
              </div>
              <p className="w-full sm:w-[20rem] text-gray-500 text-sm pt-2">
                In mollis nunc sed id semper risus in hendrerit gravida rutrum
                quisque non tellus orci, ac auctor augue mauris augue!
              </p>
            </div>
          </div>
        </section>
        {/* foot */}
        <section className="pt-[1rem] text-sm">
          <label className="pb-3 block" htmlFor>
            Name*
          </label>
          <input
            type="text"
            placeholder="username..."
            className="p-1 border-b border-gray-400 w-full outline-none"
            maxLength={50}
          />
          <p className="text-sm text-gray-600 pt-2">
            Erat nam at lectus urna duis convallis convallis tellus, id.
          </p>
          <section className="pt-[1rem] text-sm">
            <label className="pb-3 block" htmlFor>
              Bio*
            </label>
            <input
              type="text"
              placeholder="bio..."
              className="p-1 border-b border-gray-400 w-full outline-none"
              maxLength={50}
            />
            <p className="text-sm text-gray-600 pt-2">
              Erat nam at lectus urna duis convallis convallis tellus, id.
            </p>
          </section>
        </section>
        <div className="flex items-center justify-end gap-4 pt-[2rem]">
          <button className={btn}>Cancel</button>
          <button className={`${btn} bg-green-800 text-white`}>Save</button>
        </div>
      </div>
    </Modal>
  );
}
