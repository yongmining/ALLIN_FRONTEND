import React, { useState, useEffect } from 'react';
import { callTalkAddAPI, callHistoryAPI } from '../../api/talkApi';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMember, getGuestMember } from '../../api/memberApi';
import '../../css/chat.css';

function Chat() {
  const dispatch = useDispatch();
  const members = useSelector((store) => store.memberReducer);
  const guest = useSelector((store) => store.guestReducer);
  const talkList = useSelector((state) => state.talkReducer.talkList);

  console.log(talkList);

  const isMember = localStorage.getItem('accessToken') !== null;
  const isGuest = localStorage.getItem('guestCode') !== null;

  useEffect(() => {
    if (isMember) {
      dispatch(getCurrentMember());
    } else if (isGuest) {
      dispatch(getGuestMember());
    }
  }, [dispatch, isMember, isGuest]);

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [chatRequestCount, setChatRequestCount] = useState(null);

  useEffect(() => {
    // Chat 컴포넌트가 마운트될 때 톡 데이터를 가져오기 위해 callHistoryAPI를 호출
    if (isMember || isGuest) {
      callHistoryAPI(isMember ? members.memberNo : guest.guestNo)(dispatch)
        .then(() => {
          // 톡 데이터를 가져오고 Redux store에 dispatch
        })
        .catch((error) => {
          console.error('톡 데이터 가져오기 실패:', error);
        });
    }
  }, [dispatch, isMember, isGuest, members.memberNo, guest.guestNo]);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      if (chatRequestCount >= 5) {
        alert('채팅 요청 제한에 도달했습니다.');
        return;
      }

      const userNickname = members.memberNickname || guest.guestNickname;
      const userType = isMember ? 'member' : 'guest';
      const userNo = members.memberNo || guest.guestNo;
      const userMessage = { sender: userNickname, text: message };
      setChatHistory([...chatHistory, userMessage]);

      setChatRequestCount(chatRequestCount + 1);

      const responseData = await callTalkAddAPI({
        userNickname: userNickname,
        userType: userType,
        userNo: userNo,
        userMessage: message,
        chatRequestCount: chatRequestCount,
      });

      if (responseData && responseData.botMessage) {
        setChatHistory((prevHistory) => [...prevHistory, { sender: 'Chatbot', text: responseData.botMessage }]);
      }
      setMessage('');
    }
  };

  useEffect(() => {
    // 채팅 히스토리를 백엔드로부터 가져오는 로직 추가
  }, []);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {chatHistory.map((msg, index) => (
          <div key={index} className="message">
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          id="message-input"
          placeholder="메시지를 입력하세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button onClick={handleSendMessage}>보내기</button>
      </div>
    </div>
  );
}

export default Chat;
