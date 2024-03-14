import React from "react";

export default function InputBox({
  name,
  type = "text",
  placeholder,
  value,
  handleChange,
}) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="w-64 rounded-md border-2 border-slate-300 hover:border-purple-300 m-2 p-2"
    ></input>
  );
}
