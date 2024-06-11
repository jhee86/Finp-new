// src/components/Modal.js
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, onConfirm, modalType, renameValue, setRenameValue }) => {
  if (!isOpen) return null;

  const isRenameModal = modalType === 'rename';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {isRenameModal ? (
          <>
            <h3>이름을 변경하시겠습니까?</h3>
            <input 
              type="text" 
              value={renameValue} 
              onChange={(e) => setRenameValue(e.target.value)} 
              className="rename-input"
            />
          </>
        ) : (
          <h3>로그아웃 하시겠습니까?</h3>
        )}
        <div className="modal-actions">
          <button className="modal-button cancel" onClick={onClose}>취소</button>
          <button className="modal-button confirm" onClick={onConfirm}>확인</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
