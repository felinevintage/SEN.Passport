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
    // if (!newDocs) {
    //   setError("Please select a file.");
    //   return;
    // }
    const formData = new FormData();
    //console.log(newDocs);
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
    <div className="container">
      <div className="overflow-y-auto">
        <div className="grid grid-cols-3 text-center bg-slate-300 p-8 rounded-md">
          <div>
            {" "}
            <p className="font-bold text-lg">Documents</p>
          </div>

          {documents.map((document) => (
            <div
              key={document.id}
              className="bg-purple-300 p-2 m-2 rounded-md"
              onClick={() => handleDocumentClick(document)}
            >
              {document.doc_name}
            </div>
          ))}
        </div>
        <div className="text-center bg-slate-300 mt-4 p-8 rounded-md">
          <p className="font-bold text-lg mb-2">Add a new document</p>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fileInput">Choose file: </label>
              <input type="file" id="fileInput" onChange={handleFileChange} />
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
  );
}
