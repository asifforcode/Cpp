import { useContext, useEffect } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import NavBar from './NavBar';
import Loader from './Loader'; // Import your Loader component

const READ_ALONG = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;

  useEffect(() => {
    // Any necessary side effects can go here
  }, [question]);

  if (!question) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <Loader /> {/* Display the Loader component */}
      </div>
    );
  }

  const handleStartReading = () => {
    // Logic to start reading, such as navigating to another page or component
    console.log("Start Reading clicked");
    // Add your navigation or state change logic here
  };

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-1 justify-center items-center">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center border border-blue-200">
          <h2 className="text-4xl font-bold text-blue-800 mb-5">
            Read Along
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-5">
            {question.title}
          </p>
          <button
            onClick={handleStartReading}
            className="bg-blue-600 text-white px-6 py-2 rounded-full shadow-md hover:bg-blue-700 transition duration-300"
          >
            Start Reading
          </button>
        </div>
      </div>
    </div>
  );
};

export default READ_ALONG;