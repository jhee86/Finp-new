// src/components/Modal.js
import React, { useState } from "react";
import "./Modal.css";

const FaQModal = ({ isOpen, onClose, onConfirm, data }) => {
  const [faqData, setFaqData] = useState(data);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>id</p>
        <input
          type="number"
          value={faqData.id}
          onChange={(e) => setFaqData({ ...faqData, id: e.target.value })}
          className="faq-input faq-input-id"
        />

        <p>question</p>
        <input
          type="text"
          value={faqData.question}
          onChange={(e) => setFaqData({ ...faqData, question: e.target.value })}
          className="faq-input"
        />
        <p>answer</p>
        <input
          type="text"
          value={faqData.answer}
          onChange={(e) => setFaqData({ ...faqData, answer: e.target.value })}
          className="faq-input"
        />

        <div className="modal-actions">
          <button className="modal-button cancel" onClick={onClose}>
            취소
          </button>
          <button
            className="modal-button confirm"
            onClick={() => onConfirm(faqData)}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default FaQModal;
