import React from 'react';
import './FaqMessage.css';
import userImage from '../../images/짱구.png'; // 사용자 프로필 이미지 파일 경로
import botImage from '../../images/pngegg (1).png'; // 봇 프로필 이미지 파일 경로

const FaqMessage = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`chat-message ${isUser ? 'user' : 'bot'}`}>
        <img src={isUser ? userImage : botImage} alt="Profile" className="message-profile-image" />
      <div className="message-content">
        <p>{message.text}</p>
        {!isUser && message.source && (
          <p className="message-source">
            출처: <a href={message.source} target="_blank" rel="noopener noreferrer">{message.source}</a>
          </p>
        )}
        <p className="message-date">
          {message.timestamp}
        </p>
      </div>
    </div>
  );
};

export default FaqMessage;
