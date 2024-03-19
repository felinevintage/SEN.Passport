import React from "react";

export default function BackButton({ onClick }) {
  return (
    <div className="flex justify-end"> {/* Use flex justify-end to align the button to the right */}
      <button
        className="mt-0 px-4 py-2 bg-slate-100 rounded-md"
        onClick={onClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>
      </button>
    </div>
  );
}

