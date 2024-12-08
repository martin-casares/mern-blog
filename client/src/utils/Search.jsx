import { CiSearch } from "react-icons/ci";
import Modal from "./Modal";
import { useState } from "react";

export default function Search() {
  const [modal, setModal] = useState(false);

  return (
    <>
      {/* Botón para abrir el modal */}
      <button
        onClick={() => setModal(true)}
        className="flex items-center gap-2 text-gray-500 hover:text-black"
      >
        <CiSearch className="text-2xl" />
      </button>

      {/* Modal */}

      <Modal modal={modal} setModal={setModal}>
        {/*           <div className="w-[90%] max-w-sm absolute top-[90px] left-[30px]"> */}
        <div className=" absolute sm:relative right-4 left-4 top-[5rem] sm:left-0 m-5">
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-full">
            <span className="text-2xl text-gray-400">
              <CiSearch />
            </span>
            <input
              className="bg-transparent outline-none py-[0.7rem] text-sm w-full"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </Modal>
    </>
  );
}

/* import { CiSearch } from "react-icons/ci";
 * import Modal from "./Modal";
 *
 * export default function Search() {
 *   return (
 *     <>
 *       <Modal>
 *         <div className="absolute sm:relative right-4 left-4 top-[4rem] sm:left-0 sm:top-0">
 *           <div className="flex items-center gap-1 bg-gray-100 px-2 rounded-full relative">
 *             <span className="text-2xl text-gray-400">
 *               search
 *               <CiSearch />
 *             </span>
 *             <input
 *               className="bg-trnsparent outline-none"
 *               type="text"
 *               placeholder="Search"
 *             />
 *           </div>
 *         </div>
 *       </Modal>
 *     </>
 *   );
 * } */
