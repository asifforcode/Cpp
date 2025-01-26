import { useContext, useEffect } from "react";
import { QuestionContext } from "../context/QuestionContext";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

const CONTENT_ONLY = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;
  const navigate = useNavigate();

  useEffect(() => {
    // Any necessary side effects can go here
  }, [question]); 
  
  if (!question) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const handleExploreMore = () => {
    navigate("/result"); // Navigate to the Result component
  };

  return (
    <div className="bg-gradient-to-b from-sky-300 to-sky-500 min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 justify-center items-center">
        <div className="content-only-container p-6 border border-sky-200 rounded-lg shadow-xl bg-white max-w-md w-full text-center">
          <h2 className="text-3xl font-semibold text-sky-800 mb-4">
            Content Only
          </h2>
          <p className="text-gray-800 text-lg leading-relaxed mb-6">
            {question.title}
          </p>
          <button
            onClick={handleExploreMore}
            className="bg-sky-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-sky-700 transition duration-300"
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default CONTENT_ONLY;