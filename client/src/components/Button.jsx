import React from "react";

export default function Button({ text, onClick = null }) {
  return (
    <button
      onClick={onClick}
      className="bg-purple-500 hover:bg-purple-700 text-white font-bold m-2 py-2 px-4 rounded w-40 mx-auto block"
    >
      {text}
    </button>
  );
}
