import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import FaQModal from "../modal/FaQModal";
import usePagination from "../../hooks/usePagination";

const data_ = [
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

const data = [];
for (let i = 0; i < 10; i++) {
  // concat data to d with unique id for each item
  data_.forEach((item, index) => {
    data.push({
      ...item,
      id: `${i}-${item.id}`, // 고유한 id 생성
    });
  });
}

const AdminPage = ({ faqData, setFaqData }) => {
  console.log("faqdata: ", faqData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    faqData,
    15
  ); // data, itemsPerPage

  const onClickAddFQ = () => {
    setIsModalOpen(true);
  };

  const handleAddFaq = (data) => {
    const newFaq = {
      id: data.id,
      answer: data.answer,
      question: data.question,
      keyword: data.question,
      response: data.answer,
      create: new Date().toLocaleString(),
      lastUpdate: new Date().toLocaleString(),
    };

    setFaqData([...faqData, newFaq]);
    setIsModalOpen(false);
  };

  const handleRemoveFaq = (id) => {
    const newFaqData = faqData.filter((faq) => faq.id !== id);
    setFaqData(newFaqData);
  };

  const onClose = () => {
    setIsModalOpen(false);
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
          {currentData().map((item) => (
            <div key={item.id} className="table-row">
              <div id="t-id">{item.id}</div>
              <div id="t-answer">{item.question}</div>
              <div id="t-question">{item.answer}</div>
              <div id="t-create">{item.create}</div>
              <div id="t-update">{item.lastUpdate}</div>
              <div id="t-delete">
                <button
                  className="delete-button"
                  onClick={() => handleRemoveFaq(item.id)}
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="table-footer">
        <button className="fq-add-button button-align" onClick={onClickAddFQ}>
          <span className="material-symbols-outlined">add</span>
          <p>FQ 추가</p>
        </button>
        <FaQModal
          isOpen={isModalOpen}
          onClose={onClose}
          onConfirm={handleAddFaq}
          data={{ id: "", question: "", answer: "" }}
        />
        <div className="pagination">
          <span>«</span>
          {Array.from({ length: maxPage }, (_, i) => (
            <span
              key={i}
              className={`page-number ${
                i + 1 === currentPage ? "current" : ""
              }`}
              onClick={() => jump(i + 1)}
            >
              {i + 1}
            </span>
          ))}
          <span>»</span>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
