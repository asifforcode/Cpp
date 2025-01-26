import { useContext, useEffect, useState } from 'react';
import Pagination_Controller from '../components/Pagination_Controller';
import Search from '../components/Search';
import { QuestionContext } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';

const McqPage = () => {
    const { getQuestionById } = useContext(QuestionContext);
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const base_url = import.meta.env.VITE_BASE_URL;

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(
                    `${base_url}/api/questions?query=&page=${page}&limit=50&type=MCQ`
                );
                const data = await response.json();
                setQuestions(data.questions);
                setTotalPages(data.pagination.totalPages);
            } catch (error) {
                console.error('Error fetching MCQ questions:', error);
            }
        };

        fetchQuestions();
    }, [page]);

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const handleQuestionClick = async (questionId) => {
        try {
            await getQuestionById(questionId); // Ensure this updates the context.
            navigate('/mcq'); // Redirect to the MCQ page.
        } catch (error) {
            console.error('Error handling question click:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Search />
            <div className="p-8 bg-white shadow-md rounded-lg mx-auto max-w-4xl mt-6">
                <h1 className="text-center font-bold text-3xl mb-6 text-gray-800">All MCQ Questions</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {questions.map((question, index) => (
                        <div
                            key={question._id}
                            className="bg-white rounded-lg border border-gray-300 shadow-lg hover:shadow-xl transition-shadow cursor-pointer p-6 relative overflow-hidden"
                            onClick={() => handleQuestionClick(question._id)}
                        >
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                {(page - 1) * 50 + index + 1}. {question.title}
                            </h3>
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg opacity-30"></div>
                        </div>
                    ))}
                </div>

                <Pagination_Controller
                    handlePageChange={handlePageChange}
                    page={page}
                    totalPages={totalPages}
                />
            </div>
        </div>
    );
};

export default McqPage;
