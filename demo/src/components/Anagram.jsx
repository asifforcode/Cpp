import { useContext, useState } from 'react';
import { QuestionContext } from '../context/QuestionContext';
import NavBar from './NavBar';
import Loader from './Loader';

// Block Component for individual letters
const Block = ({ text, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-center items-center p-4 mb-4 rounded-full border-2 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg ${
        isSelected ? "bg-indigo-500 border-indigo-700 text-white" : "bg-white border-gray-300 text-gray-700"
      }`}
      style={{ margin: '10px' }} // Added margin for better spacing
    >
      <span className="text-xl font-semibold">{text}</span>
    </div>
  );
};

// AnagramGame Component to handle the game logic for both WORD and SENTENCE
const AnagramGame = ({ blocks, solution, anagramType }) => {
  const [selectedLetters, setSelectedLetters] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleLetterClick = (letter) => {
    setSelectedLetters((prev) => [...prev, letter]);
    setFeedbackMessage('');  // Reset feedback message on new selection
  };

  const checkAnswer = () => {
    const arrangedWord = selectedLetters.join('');
    if (arrangedWord === solution || 
      (anagramType === 'SENTENCE' && arrangedWord.replace(/([a-zA-Z0-9])/g, ' ').trim() === solution.trim())) {
      setFeedbackMessage('Correct! You solved the anagram.');
    } else {
      setFeedbackMessage('Incorrect! Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-wrap justify-center mb-4">
        {blocks?.map((block, index) => (
          block.showInOption && (
            <Block
              key={index}
              text={block.text}
              isSelected={selectedLetters.includes(block.text)}
              onClick={() => handleLetterClick(block.text)}
            />
          )
        ))}
      </div>

      <div className="text-center mt-4">
        <p className="text-lg font-semibold mb-2">Selected:</p>
        <p className="text-indigo-600 text-xl font-semibold">
          {selectedLetters.join(' ')} {/* Added space between letters */}
        </p>
        <button
          onClick={checkAnswer}
          className="w-48 py-3 px-6 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-lg font-semibold rounded-full shadow-lg transition-all duration-300 ease-in-out hover:from-indigo-600 hover:to-blue-600"
        >
          Check Answer
        </button>
        {feedbackMessage && (
          <p className={`mt-4 text-lg font-semibold ${feedbackMessage.includes('Correct') ? 'text-green-600' : 'text-red-600'}`}>
            {feedbackMessage}
          </p>
        )}
      </div>
    </div>
  );
};

// Main ANAGRAM Component
const Anagram = () => {
  const { selectedQuestion } = useContext(QuestionContext);
  const question = selectedQuestion;

  if (!question) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-100 to-blue-300 min-h-screen flex flex-col justify-between">
      <NavBar />
      <div className="flex justify-center items-center flex-1">
        <div className="bg-white rounded-xl shadow-xl p-8 w-full sm:w-96">
          <h3 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            {question.title}
          </h3>
          <AnagramGame 
            blocks={question.blocks} 
            solution={question.solution} 
            anagramType={question.anagramType} 
          />
        </div>
      </div>
    </div>
  );
};

export default Anagram;