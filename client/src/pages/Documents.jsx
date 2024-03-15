import { useState, useEffect } from "react";
import axios from "axios";

export default function Documents() {
  const [documents, setDocuments] = useState();
  const [child, setChild] = useState();

  useEffect(() => {
    getDocuments();
  });

  async function getDocuments(id) {
    // try {
    //     const docs = await axios.get(`/api/children/${id}/documents`)
    // }
  }

  return (
    <div>
      <h1>Documents</h1>
      <div>asdf</div>
    </div>
  );
}
