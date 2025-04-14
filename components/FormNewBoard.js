"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const FormNewBoard = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    if (isLoading) return;

    event.preventDefault();
    setIsLoading(true);

    try {
      const data = await axios.post("/api/board", {
        name,
      });

      setName("");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      className="bg-base-100 p-8 rounded-3xl space-y-8"
      onSubmit={handleSubmit}
    >
      <h1 className="text-3xl font-bold mb-5">Create a new board</h1>
      <label className="form-control w-full">
        <div className="label">
          <span className="label-text mb-1">Board name</span>
        </div>
        <input
          required
          value={name}
          type="text"
          className="input input-bordered w-full"
          onChange={(e) => setName(e.target.value)}
          placeholder="Future Unicorn Inc."
        />
      </label>
      <button className="btn btn-primary w-full" type="submit">
        {isLoading && (
          <span className="loading loading-spinner loading-xs"></span>
        )}
        Create Board
      </button>
    </form>
  );
};

export default FormNewBoard;
