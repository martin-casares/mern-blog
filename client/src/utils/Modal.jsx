export default function Modal({ children, modal, setModal }) {
  return (
    <>
      <div
        onClick={() => setModal(false)}
        className={`bg-white/50 fixed inset-0 z-50
        ${modal ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-500
        `}
      >
        <div onClick={(e) => e.stopPropagation()} className="relative z-20">
          {children}
        </div>
      </div>
    </>
  );
}
