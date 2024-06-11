import React, { useState } from 'react';
import './ChatMessage.css';
import userImage from '../../images/짱구.png'; // 사용자 프로필 이미지 파일 경로
import botImage from '../../images/pngegg (1).png'; // 봇 프로필 이미지 파일 경로
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
const ChatMessage = ({ message }) => {
    const isUser = message.sender === 'user';
    const isSourceMessage = message.text.includes('출처'); // 출처 키워드가 포함된 메시지 확인
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
  
    const handleLike = () => {
      if (!liked) {
        console.log('좋아요');
        setLiked(true);
        setDisliked(false); // 다른 버튼의 상태를 초기화
      }
    };
  
    const handleDislike = () => {
      if (!disliked) {
        console.log('싫어요');
        setDisliked(true);
        setLiked(false); // 다른 버튼의 상태를 초기화
      }
    };
  
    return (
      <div className={`chat-message ${isUser ? 'user' : 'bot'} ${isSourceMessage ? 'source' : ''}`}>
        <img src={isUser ? userImage : botImage} alt="Profile" className="message-profile-image" />
        <div className="message-content">
          {isUser ? (
            <>
              <p className='message-text'>{message.text}</p>
              <p className="message-date">{message.timestamp}</p>
            </>
          ) : (
            <>
              <p className='message-text'>{message.text}</p>
              {message.text !== "죄송합니다, 이해할 수 없는 메시지입니다." && (
                <>
                  <p className="message-source"><strong>출처</strong><br/><a href={message.source} target="_blank" rel="noopener noreferrer">{message.source}</a></p>
                  <div className='under-message'>
                    <p className="message-date">{message.timestamp}</p>
                    <div className="message-feedback">
                      <FaThumbsUp
                        className={`feedback-icon ${liked ? 'active' : ''}`}
                        onClick={handleLike}
                      />
                      <FaThumbsDown
                        className={`feedback-icon ${disliked ? 'active' : ''}`}
                        onClick={handleDislike}
                      />
                    </div>
                  </div>
                </>
              )}
              {message.text === "죄송합니다, 이해할 수 없는 메시지입니다." && (
                <p className="message-date">{message.timestamp}</p>
              )}
            </>
          )}
        </div>
      </div>
    );
    
    

  };
  
  export default ChatMessage;