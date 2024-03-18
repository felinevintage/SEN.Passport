import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Modal({ file, onClose }) {
  const [fileContents, setFileContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    fetchFileContents();
    console.log(file.document);
    return () => {
      //   if (fileContents) {
      //     URL.revokeObjectURL(fileContents);
      //   }
      setFileContents("");
      setLoading(true);
    };
  }, [file]);

  async function fetchFileContents() {
    try {
      const response = await axios.get(
        `/api/children/${id}/documents/${file.id}`,
        {
          responseType: "blob",
          headers: {
            // "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      setFileContents(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching file contents:", error);
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          Close
        </button>
        <h2 className="text-lg font-bold mb-4">{file.doc_name}</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <iframe
            src={`uploads/`}
            width="100%"
            height="500"
            // title="File preview"
          />
          //   <embed
          //     src={URL.createObjectURL(new Blob([fileContents]), {
          //       type: "application/pdf",
          //     })}
          //     width="100%"
          //     height="500"
          //   />
          //   <pre className="overflow-auto mx-h-80">{fileContents}</pre>
        )}
        {/* <div>{file.document.data}</div> */}
      </div>
    </div>
  );
}
