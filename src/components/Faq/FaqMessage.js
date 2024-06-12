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

  const groupedMessages = [];
  if (!isUser) {
    // 봇의 메시지일 경우, 두 줄씩 묶기
    const lines = message.text.split("\n");
    for (let i = 1; i < lines.length; i += 2) {
      groupedMessages.push(lines.slice(i, i + 2));
    }
  }

  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
      <img src={isUser ? userImage : botImage} alt="Profile" className="message-profile-image" />
      <div className="message-content">
        {!isUser && <div className="intro-message">{message.text.split("\n")[0]}</div>}
        {isUser ? (
          message.text.split("\n").map((line, index) => (
            <div key={index} className="faq-message-item">
              {line}
            </div>
          ))
        ) : (
          groupedMessages.map((group, groupIndex) => (
            <div key={groupIndex} className="faq-message-group">
              {group.map((line, index) => (
                <div key={index} className="faq-message-item">
                  {line}
                </div>
              ))}
            </div>
          ))
        )}
        <p className="message-date">{message.timestamp}</p>
      </div>
    </div>
  );
};

export default FaqMessage;