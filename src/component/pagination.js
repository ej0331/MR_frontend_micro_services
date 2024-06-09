import React from 'react';

const Pagination = ({ currentPage, maxPage, onPageChange }) => {
    // let totalPage = maxPage
    //把數字轉陣列
    const PagesArray = () => {
        const maxPagesToShow = 5;
        const pagesArray = [];
        
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        let endPage = Math.min(maxPage, startPage + maxPagesToShow - 1);
        
        if (endPage - startPage + 1 < maxPagesToShow) {
          startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
          pagesArray.push(i);
        }
        
        return pagesArray;
    };

    const handleNextPage = () => {
        const nextPage = currentPage + 1;
        if (nextPage <= maxPage) {
          onPageChange(nextPage);
        }
    };
      
    const handlePrevPage = () => {
        const prevPage = currentPage - 1;
        if (prevPage >= 1) {
          onPageChange(prevPage);
        }
    };

    const handleFirstPage = () => {
        onPageChange(1);
    };
      
    const handleLastPage = () => {
        onPageChange(maxPage);
    };

    return (
        <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
                <button 
                    onClick={handleFirstPage} 
                    disabled={currentPage === 1}
                    class="flex items-center justify-center px-3 h-8 mx-2 leading-tight border border-lightgray text-gray bg-white rounded-lg hover:bg-lightbackgroundcolor"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke-width="2" 
                        stroke="currentColor" 
                        class="w-5 h-5 text-gray"
                    >
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" 
                        />
                    </svg>
                </button>
            </li>
            <li>
                <button 
                    onClick={handlePrevPage} 
                    disabled={currentPage === 1}
                    class="flex items-center justify-center px-2 h-8 ms-0 leading-tight border border-lightgray text-gray bg-white rounded-lg hover:bg-lightbackgroundcolor"
                >
                    <svg
                        class="w-5 h-5 text-gray"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m15 19-7-7 7-7"
                    />
                    </svg>
                </button>
            </li>
            {PagesArray().map((page) => {
                return (
                    <>
                        <li key={page}>
                            <button
                                onClick={() => onPageChange(page)}
                                class={`flex items-center justify-center px-3 h-8 leading-tight text-gray border rounded-lg border-lightgray mx-1
                                ${
                                    currentPage === page ? 'bg-backgroundcolor hover:bg-lightbackgroundcolor hover:text-gray' : 'bg-white hover:bg-backgroundcolor hover:text-gray'
                                }`}
                            >
                                {page}
                            </button>
                        </li>
                    </>
                )
            })}
            <li>
                <button 
                    onClick={handleNextPage} 
                    disabled={currentPage === maxPage}
                    class="flex items-center justify-center px-2 h-8 ms-0 leading-tight border border-lightgray text-gray bg-white rounded-lg hover:bg-lightbackgroundcolor"
                >
                    <svg
                        class="w-5 h-5 text-gray"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                    <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m9 5 7 7-7 7"
                    />
                    </svg>
                </button>
            </li>
            <li>
                <button 
                    onClick={handleLastPage} 
                    disabled={currentPage === maxPage}
                    class="flex items-center justify-center px-3 mx-2 h-8 leading-tight border border-lightgray text-gray bg-white rounded-lg hover:bg-lightbackgroundcolor"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke-width="2" 
                        stroke="currentColor" 
                        class="w-5 h-5 text-gray"
                    >
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" 
                        />
                    </svg>
                </button>
            </li>
        </ul>
    );
};
  
export default Pagination;