import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    return (
        <div className="flex justify-center items-center ">
            {pageNumbers.map(number => (
                <button
                    key={number}
                    className={`px-4 py-2 mx-1 ${number === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
