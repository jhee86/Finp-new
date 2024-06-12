import React, { useState, useEffect } from "react";
import "./AdminPage.css";
import FaQModal from "../modal/FaQModal";
import usePagination from "../../hooks/usePagination";

const AdminPage = ({ faqData, setFaqData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { next, prev, jump, currentData, currentPage, maxPage } = usePagination(
    faqData,
    10
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
      date: new Date().toLocaleString(),
      text: data.answer,
    };

    setFaqData([...faqData, newFaq]);
    setIsModalOpen(false);
  };

  const handleRemoveFaq = (id) => {
    const newFaqData = faqData.filter(
      (faq) => faq.id.toString() !== id.toString()
    );

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
              <span id="t-id">{item.id}</span>
              <span id="t-answer">{item.question}</span>
              <span id="t-question">{item.answer}</span>
              <span id="t-create">{item.create}</span>
              <span id="t-update">{item.lastUpdate}</span>
              <span id="t-delete">
                <button
                  className="delete-button"
                  onClick={() => handleRemoveFaq(item.id)}
                >
                  🗑️
                </button>
              </span>
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
