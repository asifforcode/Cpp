import { useContext } from "react";
import { QuestionContext } from "../context/QuestionContext";
import Search from "./Search";
import { useNavigate } from "react-router-dom";
import Pagination_Controller from "./Pagination_Controller";

const Result = () => {
  const { questions, getQuestionById, error, pagination, searchQuestions } = useContext(QuestionContext);
  const navigate = useNavigate();

  // Function to handle page change
  const pageHandler = (page) => {
    if (pagination && page >= 1 && page <= pagination.totalPages) {
      searchQuestions(null, page);
    }
  };

  // Function to handle navigation based on question type
  const navigateHandler = (type) => {
    const routes = {
      MCQ: "/mcq",
      ANAGRAM: "/anagram",
      READ_ALONG: "/read_along",
      CONTENT_ONLY: "/content_only",
    };
    navigate(routes[type] || "/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-100 to-gray-200">
      <Search/>
      <div>
        {/* Conditional Rendering: If questions is null, show nothing */}
        {questions && questions.length > 0 ? (
          <div className="p-8 bg-white shadow-lg rounded-lg mx-auto max-w-4xl mt-6">
            <h3 className="bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-4xl font-extrabold text-transparent ... text-center mb-4">Similar Titles</h3>
            {error && <p className="text-center text-red-600 text-lg">{error}</p>}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {questions.map((question, index) => {
                const globalIndex = (pagination.page - 1) * pagination.limit + index + 1;

                return (
                  <div
                    key={question._id}
                    className="bg-white rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer p-6 relative overflow-hidden transform hover:scale-105"
                    onClick={() => {
                      navigateHandler(question.type);
                      getQuestionById(question._id);
                    }}
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      <span className="font-bold text-teal-600">{globalIndex}.</span> {question.title}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-bold">Type:</span> {question.type}
                    </p>
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg opacity-30"></div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {/* Pagination Component */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination_Controller
            handlePageChange={pageHandler}
            page={pagination.page}
            totalPages={pagination.totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default Result;
