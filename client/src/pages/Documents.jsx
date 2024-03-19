import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FilesPage from "../components/FilesPage";

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

  const handleDocumentChange = (e) => {
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
      setNewDocs(null);
    } catch (error) {
      setError(error);
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
    <FilesPage
      title="Documents"
      dateTitle="Date added"
      files={documents}
      handleFileClick={handleDocumentClick}
      handleFileChange={handleDocumentChange}
      handleSubmit={handleSubmit}
      selectedFile={selectedDocument}
      handleCloseModal={handleCloseModal}
      error={error}
      id={id}
    />
  );
}
