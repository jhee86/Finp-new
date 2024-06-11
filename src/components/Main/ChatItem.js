import React, { useState } from 'react';
import './ChatItem.css';

const ChatItem = ({ name, mode, modeClass, onClick, onRemove, onRename }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleMoreClick = (event) => {
    event.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleRenameClick = (event) => {
    event.stopPropagation();
    onRename();
  };

  const handleRemoveClick = (event) => {
    event.stopPropagation();
    onRemove();
  };

  return (
    <div className="chat-item" onClick={onClick}>
    
    <div className="chat-header">
      <div className='chat-header-name'>
      <span className="material-symbols-outlined">
        chat_bubble
      </span>
      <span className="chat-name">{name}</span>
      </div>
      <span className="material-symbols-outlined more-icon" id="more-icon" onClick={handleMoreClick}>more_horiz</span>
    </div>

    <p className={`chat-mode ${modeClass}`}><span class="material-symbols-outlined">
fiber_manual_record
</span>{mode}</p>
    {dropdownVisible && (
      <div className="dropdown-menu">
        <div className="dropdown-item" onClick={handleRenameClick}>Rename</div>
        <div className="dropdown-item" onClick={handleRemoveClick}>Remove</div>
      </div>
    )}
  </div>
  );
};

export default ChatItem;
