import React, { useContext, useEffect, useState } from 'react'
import './GuestBookDisplay.css';
import axiosInstance from "../../../axiosConfig";
import { StoreContext } from '../../context/StoreContext'

const GuestBookDisplay = () => {

  const [messages, setMessages] = useState([]);

  const fetchMessages = () => {
    axiosInstance({
      method: "get",
      url: "/api/book/getBook"
    })
      .then((response) => setMessages(response.data))

      .catch((error) => console.error("Error fetching books:" + error));
    console.log(messages)
  }

  useEffect(() => {
    fetchMessages()
  }, []);

  return (

    <div className="guest-book-display-container">
      <button hidden onClick={fetchMessages()}></button>
      {messages.slice(0).reverse().map((message, index) => (
        <div key={index} className={`message ${message.username === 'user' ? 'user-message' : 'other-message'}`}>
          <div className="profile-picture">
            <img src={message.avatar} alt="Profile" />
          </div>
          <div className="message-content">
            <div className="message-info">
              <span className="username">{message.username}</span>
              <span className="time-sent">{message.createdAt}</span>
            </div>
            <div className="message-text">
              {message.message}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default GuestBookDisplay

