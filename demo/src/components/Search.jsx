import { useState, useContext, useRef, useEffect } from 'react';
import { fetchSuggestions } from '../services/questionService';
import { QuestionContext } from '../context/QuestionContext';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';

const Search = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const { searchQuestions, setQuestions } = useContext(QuestionContext);
  const navigate = useNavigate();
  const [searching, setSearching] = useState(false);
  const searchRef = useRef(null); // Reference for the search box

  let timer;

  const handleInputChange = (e) => {
    const value = e.target.value || '';
    setQuery(value);

    if (value.length > 3) {
      clearTimeout(timer);
      setIsLoading(true);
      timer = setTimeout(async () => {
        try {
          const data = await fetchSuggestions(value);
          setSuggestions(data);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        } finally {
          setIsLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearch = async (searchQuery = query) => {
    if (searchQuery && !searching) {
      setSearching(true);
      setQuestions(null);
      setSuggestions([]);
      setActiveSuggestionIndex(-1);

      try {
        await searchQuestions(searchQuery);
        navigate(`/`);
      } catch (error) {
        console.error("Error searching questions:", error);
      } finally {
        setSearching(false);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setActiveSuggestionIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      setActiveSuggestionIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && activeSuggestionIndex >= 0) {
      setQuery(suggestions[activeSuggestionIndex]);
      handleSearch(suggestions[activeSuggestionIndex]);
    } else if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  // Close suggestions when clicking outside
  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setSuggestions([]);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef}>
      <NavBar />
      <div className="flex flex-col items-center justify-center bg-gray-100 p-4 mt-10">
        <div className="relative w-full max-w-xl mx-auto bg-white rounded-full">
          <input
            placeholder="e.g. Hello"
            className="rounded-full w-full h-16 bg-transparent py-2 pl-8 pr-32 outline-none border-2 border-gray-100 shadow-md hover:outline-none focus:ring-teal-200 focus:border-teal-200"
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() => handleSearch()}
            disabled={!query.trim() || searching}
            className={`absolute inline-flex items-center h-10 px-4 py-2 text-sm text-white transition duration-150 ease-in-out rounded-full right-3 top-3 ${
              !query.trim() || searching
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500'
            }`}
          >
            <svg className="-ml-0.5 mr-2 w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Search
          </button>
          {isLoading && (
            <p className="absolute top-full left-0 text-sm text-gray-500">Loading...</p>
          )}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white border mt-1 rounded-md w-full shadow-lg">
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className={`px-4 py-2 cursor-pointer ${activeSuggestionIndex === idx ? 'bg-gray-200' : ''} hover:bg-gray-200`}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;