import React, { useState, useEffect } from "react";

// set initial data
const initData = [
  {
    id: 1,
    question: "Stark",
    answer: "Winter is coming",
    create: "2024-06-09T10:39:22",
    lastUpdate: "2024-06-09T10:39:22",
  },
];

const usePagination = (data, itemsPerPage) => {
  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data.length / itemsPerPage);

  const currentData = () => {
    const begin = (currentPage - 1) * itemsPerPage;
    const end = begin + itemsPerPage;
    console.log("currentData", data.slice(begin, end));
    return data.slice(begin, end);
  };

  const next = () => {
    setCurrentPage((currentPage) => Math.min(currentPage + 1, maxPage));
  };

  const prev = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const jump = (page) => {
    const pageNumber = Math.max(1, page);
    setCurrentPage((currentPage) => Math.min(pageNumber, maxPage));
  };

  return { next, prev, jump, currentData, currentPage, maxPage };
};

export default usePagination;
