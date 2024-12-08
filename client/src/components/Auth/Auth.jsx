import { useState } from "react";
import { LiaTimesSolid } from "react-icons/lia";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";

import Modal from "../../utils/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

export function Auth({ modal, setModal }) {
  const [createUser, setCreteUser] = useState(false);
  const [signReq, setSignReq] = useState("");

  return (
    <Modal modal={modal} setModal={setModal}>
      <div
        className={`${modal ? "visible opacity-100%" : "invisible opacity-0"} transition-all duration-00`}
      >
        <section className="z-50 fixed top-0 bottom-0 left-0 md:left-[10rem] overflow-auto right-0 md:right-[10rem] bg-white shadows">
          <button className="absolute top-8 right-8 text-2xl hover:opacity-50">
            <LiaTimesSolid onClick={() => setModal(false)} />
          </button>
          <div className="flex flex-col justify-center items-center gap-[3rem]">
            {signReq === "" ? (
              <>
                <h2 className="text-2xl pt-[10rem]">
                  {createUser ? "Join Blog" : "Welcome Back"}
                </h2>
                <div className="flex flex-col gap-2 w-fit mx-auto">
                  <Button
                    icon={<FcGoogle className="text-xl" />}
                    text={`${createUser ? "Sign Up" : "Sign In"} With Google`}
                  />
                  <Button
                    click={() => setSignReq(createUser ? "sign-up" : "sign-in")}
                    icon={<AiOutlineMail className="text-xl" />}
                    text={`${createUser ? "Sign Up" : "Sign In"} With Email`}
                  />
                </div>
                <p>
                  {createUser ? "Already have an account" : "No Account"}

                  <button
                    onClick={() => setCreteUser(!createUser)}
                    className="text-green-600 hover:text-green-700 font-bold ml-1"
                  >
                    {createUser ? "Sign In" : "Create one"}
                  </button>
                </p>
              </>
            ) : signReq === "sign-in" ? (
              <SignIn setSignReq={setSignReq} setModal={setModal} />
            ) : signReq === "sign-up" ? (
              <SignUp setSignReq={setSignReq} />
            ) : null}
            <p className="md:w-[25rem] sm:w-[20rem]  mx-auto text-center text-sm mb-[3rem]">
              Convallis convallis tellus, id interdum velit laoreet id donec
              ultrices tincidunt arcu, non sodales neque sodales ut etiam sit
              amet.
            </p>
          </div>
        </section>
      </div>
    </Modal>
  );
}

function Button({ icon, text, click }) {
  return (
    <button
      onClick={click}
      className="flex items-center gap-10 sm:w-[20rem] border border-black px-3 py-2 rounded-full"
    >
      {icon} {text}
    </button>
  );
}
