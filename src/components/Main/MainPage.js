import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatList from './ChatList';
import ChatWindow from './ChatWindow';
import Modal from '../modal/Modal';
import AdminPage from '../Admin/AdminPage'; // 새로 추가된 AdminPage 컴포넌트
import './MainPage.css';
import profileImage from '../../images/짱구.png'; // 프로필 이미지 파일 경로

const MainPage = () => {
  const [chats, setChats] = useState([
    { name: 'Chat 1', mode: 'Live Mode', modeClass: 'live', messages: [], isToggleOn: true }
  ]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(''); // 'signOut' or 'rename'
  const [renameValue, setRenameValue] = useState('');
  const [renameIndex, setRenameIndex] = useState(null);
  const [adminMode, setAdminMode] = useState(false); // adminMode 상태 추가
  const navigate = useNavigate();

  const handleSendMessage = (message) => {
    const newChats = [...chats];
    newChats[currentChatIndex].messages.push({ text: message, sender: 'user', timestamp: new Date().toLocaleString() });
    setChats(newChats);
    setTimeout(() => {
      newChats[currentChatIndex].messages.push({ text: `Received: ${message}`, sender: 'bot', timestamp: new Date().toLocaleString() });
      setChats([...newChats]);
    }, 1000); // 1초 후에 봇의 응답 추가
  };

  const handleAddChat = () => {
    const newChatName = `Chat ${chats.length + 1}`;
    const newChat = { name: newChatName, mode: 'Live Mode', modeClass: 'live', messages: [], isToggleOn: true };
    setChats([...chats, newChat]);
    setCurrentChatIndex(chats.length); // 새 채팅으로 전환
  };

  const handleModeToggle = () => {
    const newChats = [...chats];
    newChats[currentChatIndex].isToggleOn = !newChats[currentChatIndex].isToggleOn;
    newChats[currentChatIndex].mode = newChats[currentChatIndex].isToggleOn ? 'Live Mode' : 'FAQ Mode';
    newChats[currentChatIndex].modeClass = newChats[currentChatIndex].isToggleOn ? 'live' : 'faq';
    setChats(newChats);
  };

  const handleSelectChat = (index) => {
    setCurrentChatIndex(index);
    setAdminMode(false); // 채팅을 선택하면 adminMode를 false로 설정
  };

  const handleSignOut = () => {
    setModalType('signOut');
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    if (modalType === 'signOut') {
      navigate('/');
    } else if (modalType === 'rename' && renameIndex !== null) {
      const newChats = [...chats];
      newChats[renameIndex].name = renameValue;
      setChats(newChats);
    }
    setIsModalOpen(false);
  };

  const handleRemoveChat = (index) => {
    const newChats = chats.filter((_, i) => i !== index);
    setChats(newChats);
    if (currentChatIndex >= index && currentChatIndex > 0) {
      setCurrentChatIndex(currentChatIndex - 1);
    } else if (newChats.length === 0) {
      setCurrentChatIndex(-1); // No chat selected
    } else {
      setCurrentChatIndex(0); // Select the first chat if the current one is removed
    }
  };

  const handleRenameChat = (index) => {
    setRenameIndex(index);
    setRenameValue(chats[index].name);
    setModalType('rename');
    setIsModalOpen(true);
  };

  const handleOptionClick = () => {
    setAdminMode(true);
  };

  return (
    <div className="chatbot-container">
      <ChatList 
        chatItems={chats} 
        onAddChat={handleAddChat} 
        onSelectChat={handleSelectChat} 
        onSignOut={handleSignOut}
        onRemoveChat={handleRemoveChat}
        onRenameChat={handleRenameChat}
        onOptionClick={handleOptionClick} // 옵션 클릭 핸들러 추가
      />
      <div className="main-content">
      <div className='profile-header'>
        <div className="chat-header">
          
          <img src={profileImage} alt="Profile" className="profile-image" />
          <span className="profile-name">Finger Princess</span>
         

        </div>
        </div>
        {adminMode ? (
          <AdminPage />
        ) : (
          currentChatIndex >= 0 && chats[currentChatIndex] ? (
            <ChatWindow 
              messages={chats[currentChatIndex].messages} 
              onSendMessage={handleSendMessage} 
              currentMode={chats[currentChatIndex].mode} 
              isToggleOn={chats[currentChatIndex].isToggleOn} 
              onModeToggle={handleModeToggle} 
            />
          ) : (
            <div className="no-chat-selected">채팅을 선택해주세요</div>
          )
        )}
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onConfirm={handleModalConfirm}
        modalType={modalType}
        renameValue={renameValue}
        setRenameValue={setRenameValue}
      />
    </div>
  );
};

export default MainPage;
