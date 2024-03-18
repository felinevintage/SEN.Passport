import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Documents() {
  const [documents, setDocuments] = useState([]);
  //const [child, setChild] = useState();
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

  return (
    <div>
      <p>Documents</p>

      {documents.map((document) => (
        <div key={document.id}>{document.doc_name}</div>
      ))}
    </div>
  );
}
