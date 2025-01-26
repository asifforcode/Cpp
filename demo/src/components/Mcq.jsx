import { useContext, useState, useEffect } from "react";
import { QuestionContext } from "../context/QuestionContext";
import NavBar from "./NavBar";
import Loader from "./Loader";

const Option = ({ text, isSelected, isSubmitted, isCorrect, onSelect }) => {
  const bgColor = isSubmitted
    ? isCorrect
      ? "bg-emerald-100 border-emerald-400 text-emerald-800"
      : "bg-yellow-100 border-yellow-400 text-yellow-800"
    : isSelected
    ? "bg-blue-100 border-blue-400 text-blue-800"
    : "bg-gray-50 border-gray-300 text-gray-600";

  return (
    <div
      onClick={onSelect}
      className={`flex justify-center items-center p-5 mb-5 rounded-lg border transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg cursor-pointer ${bgColor}`}
    >
      <span className={`text-lg font-medium`}>{text}</span>
    </div>
  );
};

const MCQ = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
  }, [selectedQuestion]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const submitAnswer = () => {
    if (!selectedOption) return;
    setSubmitted(true);
  };

  if (!question) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-100 to-gray-300">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-tr from-indigo-50 to-indigo-100 min-h-screen flex flex-col justify-between">
      <NavBar />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-lg">
          <h3 className="text-2xl font-extrabold text-gray-900 mb-6 text-center">{question.title}</h3>
          <div className="space-y-4">
            {question.options.map((option, index) => (
              <Option
                key={index}
                text={option.text}
                isSelected={selectedOption === option}
                isSubmitted={submitted}
                isCorrect={submitted && option.isCorrectAnswer}
                onSelect={() => handleOptionSelect(option)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center pb-10">
        <button
          onClick={submitAnswer}
          className={`w-48 py-3 px-6 bg-indigo-600 text-white text-lg font-semibold rounded-full shadow-md transition-transform duration-300 hover:scale-105 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={submitted}
        >
          {submitted ? "Submitted" : "Submit Answer"}
        </button>
      </div>
    </div>
  );
};

export default MCQ;
