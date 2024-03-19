import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import FilesPage from "../components/FilesPage";

export default function Assessments() {
  const [assessments, setAssessments] = useState([]);
  const [newAssess, setNewAssess] = useState(null);
  const [error, setError] = useState(null);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    getAssessments();
  }, []);

  async function getAssessments() {
    try {
      const response = await axios.get(`/api/children/${id}/assessments`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAssessments(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAssessmentChange = (e) => {
    setNewAssess(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", newAssess, newAssess.name);

    try {
      const response = await axios.post(
        `/api/children/${id}/assessments`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response);
      getAssessments();
    } catch (error) {
      setError(error);
      console.error("Error updating assessment:", error);
    }
  };

  const handleAssessmentClick = (assessment) => {
    setSelectedAssessment(assessment);
  };

  const handleCloseModal = () => {
    setSelectedAssessment(null);
  };

  return (
    <FilesPage
      title="Assessments"
      dateTitle="Date of the assessment"
      files={assessments}
      handleFileClick={handleAssessmentClick}
      handleFileChange={handleAssessmentChange}
      handleSubmit={handleSubmit}
      selectedFile={selectedAssessment}
      handleCloseModal={handleCloseModal}
      error={error}
      id={id}
    />
  );
}
