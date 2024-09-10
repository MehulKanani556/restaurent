import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import avatar from '../Image/usuario 1.png'
import axios from 'axios';
import { Modal, Spinner } from 'react-bootstrap';
import Home_Messages from "./Home_Messages";
import useSocket from '../hooks/useSocket';

const Home_contMes = ({ setSelectedContact, className = "" }) => {
  // const apiUrl = process.env.REACT_APP_API_URL;
  // const [token] = useState(sessionStorage.getItem('token'));
  const apiUrl = 'http://127.0.0.1:8000/api';

  const [userId] = useState(sessionStorage.getItem('userId'));
  // const [token, setToken] = useState(sessionStorage.getItem('token'));
  const [token, setToken] = useState('');

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [search, setSearch] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [activeContact, setActiveContact] = useState(null);
  const [groups, setGroups] = useState([]);
  const echo = useSocket();

  useEffect(() => {
    if (userId == 1) {
      setToken("3823|Pd1Re9TxfGSny7Kl2N2dZORsiKsonNLvIsnJK81qd826359b");
    } else if (userId == 30) {
      setToken("3821|o6h0Co2aLSh0uSrWFjDOLwAksSSQH3cIpc3hIqGfbdef0712");
    } else if (userId == 126) {
      setToken("3826|KlkYKozfzrSr8j162A62zCFuEhM49D5zk1VTI9fvdba74568");
    }
  }, [userId]);


  const fetchAllUsers = async () => {
    try {
      const response = await axios.get(`${apiUrl}/chat/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data)
      setAllUser(response.data.users);
      setGroups(response.data.groups);
      setIsProcessing(false);

    } catch (error) {
      console.error(error);
    }
    // try {
    //   const response = await axios.get(`${apiUrl}/get-users`, {
    //     headers: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    //   console.log(response.data)
    //   setAllUser(response.data);
    // setIsProcessing(false);

    // } catch (error) {
    //   console.error(error);
    // }
  }

  useEffect(() => {
    setIsProcessing(true);
    if (token)
      fetchAllUsers();
    
  }, [token])

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSendMessage = (event) => {
    if (event.key === 'Enter' && newMessage.trim() !== "") {
      setMessages([...messages, newMessage]);
      setNewMessage("");
    }
  };

  const handleContactClick = (contact) => {
    setSelectedContact(contact);
    setActiveContact(contact);

  };

  // Function to format date and time based on different conditions
  const formatDateTime = (createdAt) => {
    const messageDate = new Date(createdAt);
    const currentDate = new Date();

    // Check if the messageDate is today
    const isToday = messageDate.toDateString() === currentDate.toDateString();

    // Get yesterday's date
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const isYesterday = messageDate.toDateString() === yesterday.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    } else if (isYesterday) {
      return 'Yesterday';
    } else if (currentDate - messageDate < 7 * 24 * 60 * 60 * 1000) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return days[messageDate.getDay()];
    } else {
      return messageDate.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }
  };
  const sortedContacts = [...allUser]
  .filter(user => user.id != userId && user.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    if (!a.messages.length || !b.messages.length) return 0;
    return new Date(b.messages[0].created_at) - new Date(a.messages[0].created_at);
  });
  return (
    <div className={`sjcontacts-container ${className}`}>
      {/* chat title */}
      <div className="j-chat-size345 d-flex jchat-padding-1 px-3  m_borbot">
        {/* <svg class=" text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
          <path fill-rule="evenodd" d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z" clip-rule="evenodd" />
          <path fill-rule="evenodd" d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z" clip-rule="evenodd" />
        </svg> */}
        <h4 className='j-chat-size345 mb-0 ps-2'>Mensajes</h4>
      </div>



      {/* Search Bar */}
      <div class="m_group jay-message-padding mt-2">
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          class="mmj_icon"
        >
          <g>
            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
          </g>
        </svg>
        <input
          class="m_input ps-5  "
          type="search"
          placeholder="Buscar"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className='j-chat-sidevar-height' style={{ height: "750px", overflowY: "auto" }}>
        {/* Group Chat Header */}
        <div className="sjgroup-chat-header p-3 d-flex justify-content-between align-items-center">
          <div className="sjheader-title">Chat grupal</div>
        </div>

        {/* Contacts List */}
        {groups.map((group) => (
          <div className="sjcontacts-list" onClick={() => handleContactClick(group)} key={group.id} style={{ cursor: 'pointer' }}>
            <div className="sjcontact-item justify-content-between ">
              <div className='d-flex align-items-center'>
                <div className="sjavatar " style={{ backgroundImage: `url(${avatar})` }}>
                  <div className="sjonline-status"></div>
                </div>
                <div className="sjcontact-info ms-2">
                  <div className="sjcontact-name">{group.name}</div>
                  {/* <div className="sjcontact-message">{console.log("groups",group)}Mensajes</div> */}
                  <div className="sjcontact-message">Mensajes</div>
                </div>
              </div>
              <div className="chat-circle">
                <p className='mb-0'>4</p>
              </div>
            </div>
          </div>
        ))}


        <div className="j-chats-meaasges">
          {/* {allUser
            ?.filter(user => user.id != userId && user.name.toLowerCase().includes(search.toLowerCase()))
            .map((ele) => (
              <div key={ele.id} className={`sjcontacts-list  ${activeContact === ele ? 'jchat-active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => handleContactClick(ele)} >
                <div className="sjcontact-item" >
                  <div className="sjavatar" style={{ backgroundImage: `url(${avatar})` }}>
                    <div className="sjonline-status"></div>
                  </div>
                  <div className="sjcontact-info">
                    <div className="sjcontact-name">{ele.name}</div>
                    {console.log("Contact", ele)}
                    <div className="sjcontact-message">{ele.messages[0]?.message} </div>
                  </div>
                  <div style={{ flexGrow: 1, textAlign: 'end', fontSize: '12px', color: '#9CA3AF' }}>
                    <p className='m-0'>

                      {ele.messages[0]?.created_at ? formatDateTime(ele.messages[0]?.created_at) : null}
                    </p>
                    <p className='m-0 d-flex justify-content-end'  style={{ textAlign: "end" }}>

                      <div className="chat-circle ">
                        <p className='mb-0'>4</p>
                      </div>
                    </p>
                  </div>
                </div>
              </div>
            ))} */}
            {/* // Existing code remains unchanged */}

            {sortedContacts.map((ele) => {
              const messagesWithReadByNo = ele.messages.filter(message => message.read_by === "no");
              const numberOfMessagesWithReadByNo = messagesWithReadByNo.length;

              return (
                <div key={ele.id} className={`sjcontacts-list  ${activeContact === ele ? 'jchat-active' : ''}`} style={{ cursor: 'pointer' }} onClick={() => handleContactClick(ele)} >
                  <div className="sjcontact-item" >
                    <div className="sjavatar" style={{ backgroundImage: `url(${avatar})` }}>
                      <div className="sjonline-status"></div>
                    </div>
                    <div className="sjcontact-info">
                      <div className="sjcontact-name">{ele.name}</div>
                      {console.log("Contact", ele)}
                      <div className="sjcontact-message">{ele.messages[0]?.message} </div>
                    </div>
                    <div style={{ flexGrow: 1, textAlign: 'end', fontSize: '12px', color: '#9CA3AF' }}>
                      <p className='m-0'>
                        {ele.messages[0]?.created_at ? formatDateTime(ele.messages[0]?.created_at) : null}
                      </p>
                      <p className='m-0 d-flex justify-content-end' style={{ textAlign: "end" }}>
                        {numberOfMessagesWithReadByNo > 0 && (
                          <div className="chat-circle ">
                            <p className='mb-0'>{numberOfMessagesWithReadByNo}</p>
                          </div>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}


        </div>
      </div>
      {/* processing */}
      <Modal
        show={isProcessing}
        keyboard={false}
        backdrop={true}
        className="m_modal  m_user "
      >
        <Modal.Body className="text-center">
          <p></p>
          <Spinner animation="border" role="status" style={{ height: '85px', width: '85px', borderWidth: '6px' }} />
          <p className="mt-2">Procesando solicitud...</p>
        </Modal.Body>
      </Modal>

    </div>
  );
};

Home_contMes.propTypes = {
  className: PropTypes.string,
};
export default Home_contMes;
