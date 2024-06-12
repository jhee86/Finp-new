import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";
import Modal from "../modal/Modal";
import AdminPage from "../Admin/AdminPage";
import FaqWindow from "../Faq/FaqWindow";
import "./MainPage.css";
import profileImage from "../../images/짱구.png";
import initFAQdata from "../../data/faq_list";

const MainPage = () => {
  const [chats, setChats] = useState([
    {
      name: "Chat 1",
      mode: "Live Mode",
      modeClass: "live",
      messages: [],
      isToggleOn: true,
    },
  ]);
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [renameValue, setRenameValue] = useState("");
  const [renameIndex, setRenameIndex] = useState(null);
  const [adminMode, setAdminMode] = useState(false);
  const [faqMode, setFaqMode] = useState(false);
  const [faqData, setFaqData] = useState(initFAQdata); // FAQ 데이터를 위한 상태 추가
  const navigate = useNavigate();

  const liveData = [
    {
      keyword: "안녕",
      response: "안녕하세요!",
      source: "재희",
      date: new Date().toLocaleString(),
    },
    {
      keyword: "날씨",
      response: "오늘은 맑은 날씨입니다.",
      date: new Date().toLocaleString(),
    },

    {
      keyword: "성균관대학교 자과캠에서 화상회의 가능한 곳이 어디 있을까?",
      response:
        "성균관대학교 자과캠에서 화상회의 가능한 장소로는 에스카라 라운지, 벤젠관의 책상이 많은 곳, 산학관 1층의 러닝팩토리, 디도 5층 등이 있습니다. 또한, 학번을 빌려서 스터디룸을 예약하는 방법도 있습니다. 이러한 장소들을 이용하여 줌미팅을 진행하시면 될 것 같습니다. 감사합니다.",
      source: "https://everytime.kr/370445/v/332868383",
      date: new Date().toLocaleString(),
    },
    // 더미 데이터 추가
  ];

  const handleSendMessage = (message) => {
    const newChats = [...chats];
    const timestamp = new Date().toLocaleString();
    newChats[currentChatIndex].messages.push({
      text: message,
      sender: "user",
      timestamp,
    });

    const botResponse = generateBotResponse(message);
    newChats[currentChatIndex].messages.push({
      text: botResponse.text,
      sender: "bot",
      timestamp,
      source: botResponse.source,
    });

    setChats(newChats);
  };

  const generateBotResponse = (message) => {
    const data = faqMode ? faqData : liveData;

    if (typeof message === "string") {
      if (faqMode) {
        const keywordMatches = data.filter((data) =>
          data.keyword.includes(message)
        );
        if (keywordMatches.length > 0) {
          const responseText = `'${message}'에 대해 알려드리겠습니다.\n` + keywordMatches
            .map(
              (item, index) =>
                `${index + 1}.  ${item.question}\n A: ${item.answer}`
            )
            .join("\n");
          return {
            text: responseText,
            source: keywordMatches.map((item) => item.source).join(", "),
            date: new Date().toLocaleString(),
          };
        }
      } else {
        const keywordMatch = data.find((data) => message.includes(data.keyword));
        if (keywordMatch) {
          return {
            text: `${keywordMatch.response}`,
            source: keywordMatch.source,
            date: keywordMatch.date,
          };
        }
      }
    }
    return { text: "죄송합니다, 이해할 수 없는 메시지입니다." };
  };

  const handleAddChat = () => {
    const newChatName = `Chat ${chats.length + 1}`;
    const newChat = {
      name: newChatName,
      mode: "Live Mode",
      modeClass: "live",
      messages: [],
      isToggleOn: true,
    };
    setChats([...chats, newChat]);
    setCurrentChatIndex(chats.length); // 새 채팅으로 전환
  };

  const handleModeToggle = () => {
    const newChats = [...chats];
    newChats[currentChatIndex].isToggleOn =
      !newChats[currentChatIndex].isToggleOn;
    newChats[currentChatIndex].mode = newChats[currentChatIndex].isToggleOn
      ? "Live Mode"
      : "FAQ Mode";
    newChats[currentChatIndex].modeClass = newChats[currentChatIndex].isToggleOn
      ? "live"
      : "faq";
    setChats(newChats);
    setFaqMode(!newChats[currentChatIndex].isToggleOn);
  };

  const handleSelectChat = (index) => {
    setCurrentChatIndex(index);
    setAdminMode(false); // 채팅을 선택하면 adminMode를 false로 설정
  };

  const handleSignOut = () => {
    setModalType("signOut");
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    if (modalType === "signOut") {
      navigate("/");
    } else if (modalType === "rename" && renameIndex !== null) {
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
    setModalType("rename");
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
        onOptionClick={handleOptionClick}
      />
      <div className="main-content">
        <div className="profile-header">
          <div className="chat-header">
            <img src={profileImage} alt="Profile" className="profile-image" />
            <span className="profile-name">Finger Princess</span>
          </div>
        </div>
        {adminMode ? (
          <AdminPage faqData={faqData} setFaqData={setFaqData} />
        ) : faqMode ? (
          <FaqWindow
            messages={chats[currentChatIndex].messages}
            onSendMessage={handleSendMessage}
            currentMode={chats[currentChatIndex].mode}
            isToggleOn={chats[currentChatIndex].isToggleOn}
            onModeToggle={handleModeToggle}
          />
        ) : currentChatIndex >= 0 && chats[currentChatIndex] ? (
          <ChatWindow
            messages={chats[currentChatIndex].messages}
            onSendMessage={handleSendMessage}
            currentMode={chats[currentChatIndex].mode}
            isToggleOn={chats[currentChatIndex].isToggleOn}
            onModeToggle={handleModeToggle}
          />
        ) : (
          <div className="no-chat-selected">채팅을 선택해주세요</div>
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
