import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Modal from "../components/Modal";
import BackButton from "../components/BackButton";
import InputBox from "./InputBox";

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
  date,
  setDate,
  handleDateChange,
}) {
  const navigate = useNavigate();

  return (
    <div className="container h-full min-h-screen">
    <BackButton onClick={() => navigate(`/children/${id}`)} />
    
      <div className="flex justify-center pt-10">
        {" "}
        <h1 className="font-bold text-lg">{title}</h1>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 flex justify-center my-10 h-fit">
          <table className="table-auto">
            <thead>
              <tr
                key="title"
                className="bg-slate-100 text-slate-400 border-b-2 border-slate-300"
              >
                <th className="p-2">File Name</th>
                <th className="p-2">Link</th>
                <th className="p-2">{dateTitle}</th>
              </tr>
            </thead>
            <tbody>
              {!files.length ? (
                <tr className="bg-slate-50 text-slate-500">
                  <td className="px-4 py-2 text-center">No files</td>
                  <td className="px-4 py-2"></td>
                  <td className="px-4 py-2"></td>
                </tr>
              ) : (
                files.map((file) => (
                  <tr key={file.id} className="bg-slate-50 text-slate-500">
                    <td className="px-4 py-2 text-center ">
                      {file.doc_name ? file.doc_name : file.assessment_type}
                    </td>
                    <td
                      className="px-4 py-2 cursor-pointer text-center"
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
                    <td className="px-4 py-2 text-center">
                      {file.date ? file.date : file.createdAt.slice(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-slate-200 col-span-1 flex justify-center my-10 h-fit">
          <div className=" p-8 rounded-md text-slate-500">
            <p className="font-bold text-lg mb-2">
              Add a new {title.slice(0, -1).toLowerCase()}
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label htmlFor="fileInput">Choose file: </label>
                <input
                  type="file"
                  id="fileInput"
                  onChange={handleFileChange}
                  className="py-2"
                />
              </div>

              <div>
                {title === "Assessments" ? (
                  <InputBox
                    name="date"
                    type="date"
                    placeholder="Assessment date"
                    handleChange={handleDateChange}
                    value={date}
                  />
                ) : null}
              </div>
              {error && <p>{error}</p>}
              <Button text={`New ${title.slice(0, -1)}`} />
            </form>
          </div>
        </div>
        {selectedFile && (
          <Modal
            file={selectedFile}
            onClose={handleCloseModal}
            dataType={title.toLowerCase()}
          />
        )}
      </div>
    </div>
  );
}
