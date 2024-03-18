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
    </div>
  );
}
