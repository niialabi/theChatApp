import { useState } from "react";
import toast from "react-hot-toast";

const SearchInput = ({ createRoom }) => {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    if (name.length < 3) {
      return toast.error("name must be at least 3 characters long.");
    }
    createRoom(name);
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2">
      <input
        type="text"
        placeholder="New chat's name"
        className="input input-bordered rounded-full"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        +
      </button>
    </form>
  );
};

export default SearchInput;
