import React, { useState, useEffect } from 'react';
import { callTalkAddAPI, callHistoryAPI } from '../../api/talkApi';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentMember, getGuestMember } from '../../api/memberApi';
import '../../css/chat.css';

function Chat() {
  const dispatch = useDispatch();
  const members = useSelector((store) => store.memberReducer);
  const guest = useSelector((store) => store.guestReducer);
  const talkList = useSelector((store) => store.talkReducer);

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
  const [chatHistory, setChatHistory] = useState(talkList || []);

  useEffect(() => {
    if (isMember || isGuest) {
      dispatch(callHistoryAPI(isMember ? members.memberNo : guest.guestNo));
    }
  }, [dispatch, isMember, isGuest, members.memberNo, guest.guestNo]);

  const handleSendMessage = async () => {
    if (message.trim() !== '') {
      if (isGuest && talkList.length >= 5) {
        alert('게스트는 5회 이상 메시지를 보낼 수 없습니다.');
        return;
      }

      const userNickname = members.memberNickname || guest.guestNickname;
      const userType = isMember ? 'member' : 'guest';
      const userNo = members.memberNo || guest.guestNo;
      const userMessage = { sender: userNickname, text: message };
      setChatHistory([...chatHistory, userMessage]);

      const responseData = await callTalkAddAPI({
        userNickname: userNickname,
        userType: userType,
        userNo: userNo,
        userMessage: message,
      });

      if (responseData && responseData.botMessage) {
        setChatHistory((prevHistory) => [...prevHistory, { sender: 'Chatbot', text: responseData.botMessage }]);
      }
      setMessage('');
    }
    window.location.reload();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {talkList.map((talk, index) => (
          <div key={index} className="message">
            <strong>{talk.userNickname}:</strong> {talk.userMessage}
            <br />
            <strong>Chatbot:</strong> {talk.responseNo.botMessage}
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
