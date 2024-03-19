import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";

export default function FilesPage({
  title,
  dateTitle,
  files,
  handleFileClick,
  handleFileChange,
  handleSubmit,
  selectedFile,
  handleCloseModal,
  error,
  id,
}) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-center pt-10">
        {" "}
        <h1 className="font-bold text-lg">{title}</h1>
      </div>
      <BackButton onClick={() => navigate(`/children/${id}`)} />
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 flex justify-center my-10">
          <table className="table-auto bg-slate-300 p-8 rounded-md">
            <thead>
              <tr key="title">
                <th>Name</th>
                <th>Link</th>
                <th>{dateTitle}</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id}>
                  <td className="border px-4 py-2">
                    {file.doc_name ? file.doc_name : file.assessment_type}
                  </td>
                  <td
                    className="border px-4 py-2 cursor-pointer"
                    onClick={() => handleFileClick(file)}
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
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </td>
                  <td className="border px-4 py-2">
                    {file.date ? file.date : file.createdAt.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-1 flex justify-center my-10 h-56">
          <div className="bg-slate-300 p-8 rounded-md">
            <p className="font-bold text-lg mb-2">Add a new {title}</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="fileInput">Choose file: </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="border p-2 rounded-md"
                />
              </div>
              {error && <p>{error}</p>}
              <Button text={`New ${title}`} />
            </form>
          </div>
          {selectedFile && (
            <Modal file={selectedFile} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
}
