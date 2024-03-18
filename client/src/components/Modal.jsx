import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Modal({ file, onClose }) {
  const [fileContents, setFileContents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [docId, setDocId] = useState(null);
  const { id } = useParams();

  const xhr = new XMLHttpRequest();

  xhr.open("GET", `/api/children/${id}/documents/${file.id}`);
  xhr.onreadystatechange = handler;
  xhr.responseType = "blob";
  xhr.setRequestHeader(
    "Authorization",
    "Bearer " + localStorage.getItem("token")
  );
  xhr.send();

  function handler() {
    if (this.readyState === this.DONE) {
      if (this.status === 200) {
        // this.response is a Blob, because we set responseType above
        var data_url = URL.createObjectURL(this.response);
        document.querySelector("#fileDisplay").src = data_url;
      } else {
        console.error("no pdf :(");
      }
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-md">
        <button onClick={onClose} className="absolute top-0 right-0 p-2">
          Close
        </button>
        <h2 className="text-lg font-bold mb-4">{file.doc_name}</h2>
        {/* {loading ? (
          <p>Loading...</p>
        ) : ( */}
        <iframe
          id="fileDisplay"
          // src={`localhost:5000/api/children/${id}/documents/${file.id}`}
          width="100%"
          height="500"
          // title="File preview"
        />
      </div>
    </div>
  );
}
