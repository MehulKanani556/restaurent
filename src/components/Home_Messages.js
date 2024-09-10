import PropTypes from "prop-types";
import Home_ChatBubble from "./Home_ChatBubble";
import ChatBubble from "./ChatBubble";
import avatar from '../Image/usuario 1.png'

import { useEffect, useState, useRef } from "react";
import { Image } from "react-bootstrap";
import echo from "../echo";
import Echo from "laravel-echo";
import { io } from 'socket.io-client';
import useSocket from "../hooks/useSocket";
import axios from "axios";
// import { textAlign } from "html2canvas/dist/types/css/property-descriptors/text-align";

const Home_Messages = ({ contact  }) => {

  // const [displayText, setDisplayText] = useState('Escribir ...');

  const apiUrl = 'http://127.0.0.1:8000/api';
  // const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  // const [userId, setUserId] = useState(sessionStorage.getItem('userId'));
  const [inputText, setInputText] = useState('');
  const [msg, setMsg] = useState([]);
  const echo = useSocket();

  const messagesEndRef = useRef(null); // Create a ref for the end of messages
  const chatContainerRef = useRef(null); // Create a ref for the chat container

  useEffect(() => {
    if (userId == 1) {
      setToken("3823|Pd1Re9TxfGSny7Kl2N2dZORsiKsonNLvIsnJK81qd826359b");
    } else if (userId == 30) {
      setToken("3821|o6h0Co2aLSh0uSrWFjDOLwAksSSQH3cIpc3hIqGfbdef0712");    
    } else if (userId == 126) {
      setToken("3826|KlkYKozfzrSr8j162A62zCFuEhM49D5zk1VTI9fvdba74568");
    }
  }, [userId]);



  const handleButtonClick = (text) => {
    setInputText(text);
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // Shift + Enter: add a new line
        return;
      } else {
        // Enter without Shift: send the message
        event.preventDefault();
        sendMessage();
      }
    }
  };

  // console.log("sdbsudf", contact)
  useEffect(() => {
    if (echo) {
      echo.connector.pusher.connection.bind('connected', () => {
        console.log("chat message "); // Update state when connected
      });
      echo.connector.pusher.connection.bind('error', (error) => {
        console.error("Connection error:", error);
      });
     echo.channel(`chat.${contact.id}.${userId}`)
        .listen('Chat', (data) => {
          // setMsg(prevMsg => [...prevMsg, data]);
          console.log("chat message success", data);
          fetchMsg();
        }); 
    }
    fetchMsg();
  }, [echo, contact, inputText,token]);
  useEffect(() => {
    // Scroll to the bottom of the chat when the component mounts
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, []);
  useEffect(() => {
    // Scroll to the bottom of the chat when new messages are added
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [msg]);

  const fetchMsg = async () => {
    try {
      const response = await axios.post(`${apiUrl}/chat/messages`, {
        receiver_id: contact.id,
        group_id: contact?.pivot?.group_id || null,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      // console.log("msg", response.data)
      setMsg(response.data);
    } catch (error) {
      console.error("error at fetch message", error);
    }
  }
  const sendMessage = async () => {
    if (!contact) { // Adjust this condition based on your logic
      alert('Please select a user or a group to send a message.');
      return;
    }

    try {
      await axios.post(`${apiUrl}/chat/broadcast`, {
        username: contact.name, // Adjust based on your data structure
        receiver_id: contact.id || null, // Adjust based on your data structure
        msg: inputText,
        group_id: contact?.pivot?.group_id || null,
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      
      // Add logic to update the message list if needed
      setInputText(''); // Clear input after sending
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const styles = {
    container: {
      alignSelf: "stretch",
      backgroundColor: "#111928",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      padding: "16px 0px 0px 16px",
      boxSizing: "border-box",
      position: "absolute",
      top: "140px",
      gap: "16px",
      left: "621px",
      width: "67%",
      height: "612px",
      overflowY: "auto",
      textAlign: "left",
      fontSize: "14px",
      color: "#fff",
      fontFamily: "Inter",
    },
    footer: {
      width: "68%",
      margin: "0",
      position: "fixed",
      bottom: "0px",
      left: "621px",
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      justifyContent: "flex-start",
      maxWidth: "100%",
      textAlign: "left",
      fontSize: "14px",
      color: "#9ca3af",
      fontFamily: "Inter",
      marginTop: "10px"
    },
    button: {
      backgroundColor: "transparent",
      border: "1px solid #d1d5db",
      borderRadius: "9999px",
      padding: "6px 11px",
      color: "white",
      cursor: "pointer",
    },
    inputField: {
      backgroundColor: "#1f2a37",
      padding: "12px 16px",
      // borderBottom: "1px solid #374151",
      width: "100%",
    },
    sendButton: {
      cursor: "pointer",
      border: "none",
      padding: "8px 12px",
      backgroundColor: "#147bde",
      borderRadius: "8px",
      overflow: "hidden",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      gap: "8px",
    },
    sendButtonDiv: {
      position: "relative",
      fontSize: "12px",
      lineHeight: "150%",
      fontWeight: "500",
      fontFamily: "Inter",
      color: "#fff",
      textAlign: "left",
      display: "inline-block",
      minWidth: "87px",
    },
    date: {
      fontWeight: "bold",
      color: "#9ca3af",
      margin: "10px 0",
      textAlign: "center", // Added text-align property
      // backgroundColor: "#f3f4f6", // Added background color
    },
    dateSpan: {
      backgroundColor: "#374152",
      padding: "2px 6px",
      borderRadius: "4px",
     
      
      fontWeight: "500",
    }
    // Add other styles as needed
  };

  return (
    <div style={styles.container} className="j-chat-margin" ref={chatContainerRef}>
      <div className="m_borbot jchat-padding-2 px-3 d-flex align-items-center j-chat-position-fixed" style={{ zIndex: "0" }}>
        <Image src={avatar} roundedCircle width="32" height="32" className="me-2" />
        <div>
          <div className="fw-bold j-chat-bold-size m16">{contact.name}</div>
          <div className="d-flex align-items-center text-success small j-chat-bold-size-2">
            <div className="bg-success rounded-circle" style={{ width: '8px', height: '8px' }}></div>
            <span className="ms-2">Online</span>
          </div>
        </div>
      </div>

      <div className="w-100 ">
        {Array.isArray(msg) && msg.length > 0 ? (
          Object.entries(msg.reduce((acc, message) => {
            const messageDate = new Date(message.created_at);
            let displayDate;

            const today = new Date();
            const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            const daysAgo = Math.floor((today - messageDate) / (1000 * 60 * 60 * 24));

            if (daysAgo < 7) {
              displayDate = weekDays[messageDate.getDay()];
            } else {
              displayDate = messageDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
            }

            if (!acc[displayDate]) acc[displayDate] = [];
            acc[displayDate].push(message);
            return acc;
          }, {})).map(([date, dateGroup]) => (
            <div key={date}>
              <p style={styles.date}><span style={styles.dateSpan}>{date}</span></p> {/* Display the date */}
              {dateGroup.map((message, index) => {
                if (message.sender_id == userId) {
                  return <ChatBubble key={index} details={message} />;
                } else if (message.receiver_id == userId) {
                  return <Home_ChatBubble key={index} details={message} receiver={contact} />;
                } else if (message.group_id == contact?.pivot?.group_id) {
                  return <Home_ChatBubble key={index} details={message} receiver={contact} />;
                } else {
                  return null;
                }
              })}
            </div>
          ))
        ) : (
          <div style={{display:'grid',placeItems:'center'}}><p>No hay mensajes disponibles.</p></div> // Optional: Display a message when there are no messages
        )}
      </div>
      <footer
        className="j-footer-set-left"
        style={styles.footer}
      >
        <div style={{
          backgroundColor: "#1f2a37",
          padding: "12px 16px",
          borderBottom: "1px solid #374151",
          width: "100%",
        }}>
          <div className="j_chat_footer" style={{
            gap: "12px",
            marginBottom: "12px",
          }}>
            <button onClick={() => handleButtonClick('Hola ¿Cómo estas?')} className="j_chat_default_button" style={styles.button}>
              Hola ¿Cómo estas?
            </button>
            <button onClick={() => handleButtonClick('Corregir pedido')} style={styles.button}>
              Corregir pedido
            </button>
          </div>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder="Escribir ..."
            className="j_chat_inputfield"
            style={styles.inputField}
          />
          {/* <textarea
  value={inputText}
  onChange={handleInputChange}
  onKeyDown={handleKeyPress}
  placeholder="Escribir ..."
  className="j_chat_inputfield"
  style={{
    ...styles.inputField,
    resize: "none",
    minHeight: "40px",
    maxHeight: "120px",
    overflowY: "auto"
  }}
/> */}
        </div>
        <div
          style={{
            alignSelf: "stretch",
            backgroundColor: "#1f2a37",
            overflow: "hidden",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "12px 16px",
          }}
        >
          <button
            onClick={sendMessage}
            style={styles.sendButton}
          >
            <div style={styles.sendButtonDiv}>
              Enviar mensaje
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};



export default Home_Messages;