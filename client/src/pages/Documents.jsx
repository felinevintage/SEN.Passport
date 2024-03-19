import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../components/Button";
import Modal from "../components/Modal";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [newDocs, setNewDocs] = useState(null);
  const [error, setError] = useState(null);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    try {
      const response = await axios.get(`/api/children/${id}/documents`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setDocuments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (e) => {
    //console.log(e);
    setNewDocs(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", newDocs, newDocs.name);

    try {
      const response = await axios.post(
        `/api/children/${id}/documents`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      getDocuments();
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  const handleDocumentClick = (document) => {
    setSelectedDocument(document);
  };

  const handleCloseModal = () => {
    setSelectedDocument(null);
  };

  return (
    <div>
      <div className="flex justify-center pt-10">
        {" "}
        <h1 className="font-bold text-lg">Documents</h1>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-1 flex justify-center my-10">
          <table className="table-auto bg-slate-300 p-8 rounded-md">
            <thead>
              <tr key="title">
                <th>Name</th>
                <th>Link</th>
                <th>Date added</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((document) => (
                <tr key={document.id}>
                  <td className="border px-4 py-2">{document.doc_name}</td>
                  <td
                    className="border px-4 py-2 cursor-pointer"
                    onClick={() => handleDocumentClick(document)}
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
                    {document.createdAt.slice(0, 10)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="col-span-1 flex justify-center my-10 h-56">
          <div className="bg-slate-300 p-8 rounded-md">
            <p className="font-bold text-lg mb-2">Add a new document</p>
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
              <Button text={"Add document"} />
            </form>
          </div>
          {selectedDocument && (
            <Modal file={selectedDocument} onClose={handleCloseModal} />
          )}
        </div>
      </div>
    </div>
  );
}
