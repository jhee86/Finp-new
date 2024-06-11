import React, { useState } from 'react';
import './FaqMessage.css';
import userImage from '../../images/짱구.png'; // 사용자 프로필 이미지 파일 경로
import botImage from '../../images/pngegg (1).png'; // 봇 프로필 이미지 파일 경로

const FaqMessage = ({ message }) => {
  const isUser = message.sender === 'user';
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
        <img src={isUser ? userImage : botImage} alt="Profile" className="message-profile-image" />
      <div className="message-content">
        <p className='message-text'>{message.text}</p>

        {!isUser && message.response && (
          <div className="faq-item">
            <div className="faq-header" onClick={handleToggle}>
              <strong>{message.response}</strong>
              <span className={`faq-toggle ${isOpen ? 'open' : ''}`}>▼</span>
            </div>
            {isOpen && (
              <div className="faq-details">
                <p>{message.details}</p>
                <br/>
                <p className="message-source">
                  출처: <a href={message.source} target="_blank" rel="noopener noreferrer">{message.source}</a>
                </p>
              </div>
            )}
          </div>
        )}
        <p className="message-date">{message.timestamp}</p>
      </div>
    </div>
  );
};

export default FaqMessage;
