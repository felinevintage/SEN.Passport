import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Button from "../components/Button";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  const [newDocs, setNewDocs] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getDocuments();
  }, []);

  async function getDocuments() {
    try {
      const response = await fetch(`/api/children/${id}/documents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const docsData = await response.json();
        setDocuments(docsData);
      } else {
        console.log("Failed to get documents");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleFileChange = (e) => {
    setNewDocs(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newDocs) {
      setError("Please select a file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", newDocs);

    try {
      const response = await fetch(`/api/children/${id}/documents`, {
        method: "POST",
        body: formData,
        headers: {
          // "Content-Type": "multipart/form-data",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        getDocuments();
        // console.log(data);
      } else {
        console.log("Failed to add document");
      }
    } catch (error) {
      console.error("Error updating document:", error);
    }
  };

  return (
    <div className="container p-4 flex justify-center items-center h-screen">
      <div className="text-center bg-slate-300 p-8 rounded-md">
        <div>
          {" "}
          <p className="font-bold text-lg">Documents</p>
        </div>

        {documents.map((document) => (
          <div key={document.id} className="bg-purple-300 p-2 m-2 rounded-md ">
            {document.doc_name}
          </div>
        ))}
      </div>
      <div className="text-center bg-slate-300 m-2 p-8 rounded-md">
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
    </div>
  );
}
