import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import Modal from "../modal/Modal";

const data = [
  {
    id: 2,
    question: "Lannister",
    answer:
      "ㅁㄴㄻㅇㄴㄹㄴㅇㄹㅇㄴㅁ ㄻㄴ ㅁㄴㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅇㄴㅁ ㄹㅇㅁㄴㄹ ㅁㄴㅇㄹ ㄴㅁㅇㄹ ",
    create: "2024-06-09T10:39:22",
    lastUpdate: "2024-06-09T10:39:22",
  },
  {
    id: 3,
    question: "Lannister",
    answer:
      "ㅁㄴㄻㅇㄴㄹㄴㅇㄹㅇㄴㅁ ㄻㄴ ㅁㄴㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅇㄴㅁ ㄹㅇㅁㄴㄹ ㅁㄴㅇㄹ ㄴㅁㅇㄹ ",
    create: "2024-06-09T10:39:22",
    lastUpdate: "2024-06-09T10:39:22",
  },
  {
    id: 4,
    question: "Lannister",
    answer:
      "ㅁㄴㄻㅇㄴㄹㄴㅇㄹㅇㄴㅁ ㄻㄴ ㅁㄴㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅇㄴㅁ ㄹㅇㅁㄴㄹ ㅁㄴㅇㄹ ㄴㅁㅇㄹ ",
    create: "2024-06-09T10:39:22",
    lastUpdate: "2024-06-09T10:39:22",
  },
  {
    id: 5,
    question: "Lannister",
    answer:
      "ㅁㄴㄻㅇㄴㄹㄴㅇㄹㅇㄴㅁ ㄻㄴ ㅁㄴㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅇㄴㅁ ㄹㅇㅁㄴㄹ ㅁㄴㅇㄹ ㄴㅁㅇㄹ ",
    create: "2024-06-09T10:39:22",
    lastUpdate: "2024-06-09T10:39:22",
  },
  {
    id: 6,
    question: "Lannister",
    answer:
      "ㅁㄴㄻㅇㄴㄹㄴㅇㄹㅇㄴㅁ ㄻㄴ ㅁㄴㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅇㄴㅁ ㄹㅇㅁㄴㄹ ㅁㄴㅇㄹ ㄴㅁㅇㄹ ",
    create: "2024-06-09T10:39:22",
    lastUpdate: "2024-06-09T10:39:22",
  },
  {
    id: 7,
    question: "Lannister",
    answer:
      "ㅁㄴㄻㅇㄴㄹㄴㅇㄹㅇㄴㅁ ㄻㄴ ㅁㄴㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅁㄴㅇㄹ ㅇㄴㅁ ㄹㅇㅁㄴㄹ ㅁㄴㅇㄹ ㄴㅁㅇㄹ ",
    create: "2024-06-09T10:39:22",
    lastUpdate: "2024-06-09T10:39:22",
  },
];
const d = [];
for (let i = 0; i < 10; i++) {
  // concat data to d
  d.push(...data);
}

const AdminPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [items, setItems] = useState([]);
  const itemsPerPage = 10;

  // Concatenate data 10 times for testing
  const concatenatedData = Array(10).fill(data).flat();

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setItems(concatenatedData.slice(indexOfFirstItem, indexOfLastItem));
    console.log(items);
  }, [currentPage]);

  const totalPages = Math.ceil(concatenatedData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="content">
      <div className="admin-table">
        <div className="table-header">
          <span id="t-id">Id</span>
          <span id="t-answer">answer</span>
          <span id="t-question">question</span>
          <span id="t-create">creaste</span>
          <span id="t-update">last update</span>
          <span id="t-delete">remove</span>
        </div>
        <div className="table-body">
          {items.map((item) => (
            <div key={item.id} className="table-row">
              <div id="t-id">{item.id}</div>
              <div id="t-answer">{item.question}</div>
              <div id="t-question">{item.answer}</div>
              <div id="t-create">{item.create}</div>
              <div id="t-update">{item.lastUpdate}</div>
              <div id="t-delete">
                <button className="delete-button">🗑️</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="table-footer">
        <button className="fq-add-button button-align">
          <span className="material-symbols-outlined">add</span>
          <p>FQ 추가</p>
        </button>
        <div className="pagination">
          <span>«</span>
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              className={`page-number ${
                i + 1 === currentPage ? "current" : ""
              }`}
              onClick={() => handlePageChange(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          {/* 
          <span className="page-number">1</span>
          <span className="page-number">2</span>
          <span className="page-number">3</span>
          <span className="page-number">4</span>
          <span className="page-number">5</span> */}
          <span>»</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
