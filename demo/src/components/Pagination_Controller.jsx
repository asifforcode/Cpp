import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination_Controller = ({ handlePageChange, page, totalPages }) => {
  return (
    <div className='flex justify-center items-center bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg p-4 shadow-lg'>
      <button 
        className={`flex items-center bg-white text-indigo-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform ${page <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-200 hover:scale-105 hover:shadow-xl'}`} 
        onClick={() => handlePageChange(page - 1)} 
        disabled={page <= 1}
      >
        <FaChevronLeft className='mr-2' />
        Previous
      </button>
      <span className='mx-4 text-white font-semibold text-lg'>{`Page ${page} of ${totalPages}`}</span>
      <button 
        className={`flex items-center bg-white text-indigo-600 px-4 py-2 rounded-md transition duration-300 ease-in-out transform ${page >= totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-200 hover:scale-105 hover:shadow-xl'}`} 
        onClick={() => handlePageChange(page + 1)} 
        disabled={page >= totalPages}
      >
        Next
        <FaChevronRight className='ml-2' />
      </button>
    </div>
  );
}

export default Pagination_Controller;