export default function Input({ title, type, value, onChange }) {
  return (
    <div className="flex flex-col gap-2 mx-auto w-full sm:w-[70%] ">
      <label className="text-sm capitalize">{title}</label>
      <input
        className="text-center border-b border-black outline-none"
        type={type}
        name={title}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
