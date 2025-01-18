export default function ProfileAbout({ userInfo, setEditModal }) {
  return (
    <div className="w-[50%]">
      <p className="text-2xl first-letter:uppercase">
        {userInfo?.bio || userInfo?.username + " has no bio."}
      </p>
      <div className="text-right">
        <button
          onClick={() => setEditModal(true)}
          className="border border-black py-2 px-5 rounded-full text-black"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
