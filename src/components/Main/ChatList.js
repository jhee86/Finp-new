import React from 'react';
import ChatItem from './ChatItem';
import './ChatList.css';

const ChatList = ({ chatItems, onAddChat, onSelectChat, onSignOut, onRemoveChat, onRenameChat, onOptionClick }) => {
  return (
    <div className="sidebar">
      <div className='sidebar-header'>
      <img src='/assets/pngegg (1).png' alt="skku logo" />
      <div className="logo">Fing-P CHATBOT</div>
      </div>

      <div className="chat-list">
        {chatItems.map((item, index) => (
          <ChatItem 
            key={index} 
            name={item.name} 
            mode={item.mode} 
            modeClass={item.modeClass} 
            onClick={() => onSelectChat(index)} 
            onRemove={() => onRemoveChat(index)}
            onRename={() => onRenameChat(index)}
          />
        ))}
      </div>
      <button className="add-question button-align" onClick={onAddChat}>      
        <span className="material-symbols-outlined">
add
</span><p>
Add Question
</p>
      </button>

      <button className="option button-align" onClick={onOptionClick}>
  <span className="material-symbols-outlined">
    settings
  </span> <p>
  Option
    </p>
</button>

      <button className="sign-out button-align" onClick={onSignOut}>
  <span className="material-symbols-outlined">
    logout
  </span> <p>
  Sign Out
    </p>
</button>

    </div>
  );
};

export default ChatList;
