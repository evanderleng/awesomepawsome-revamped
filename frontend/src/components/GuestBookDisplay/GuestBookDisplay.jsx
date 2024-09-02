import React, { useContext, useEffect, useState } from 'react'
import './GuestBookDisplay.css';
import axiosInstance from "../../../axiosConfig";
import RefreshIcon from '@mui/icons-material/Refresh';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Button from "@mui/material/Button";
import { StoreContext } from '../../context/StoreContext'

const GuestBookDisplay = () => {

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);

  const fetchMessages = () => {

    axiosInstance({
      method: "get",
      url: `/api/book/${page}`
    })
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error fetching books:" + error));
  }

  const paginationFunc = (newPage) => {
    if (messages.length == 10 || newPage < page){ //goofy ahh line
      setPage(newPage);
    }
  }

  useEffect(() => {
    fetchMessages();
  }, [page]);


  useEffect(() => {
    fetchMessages()
  }, []);

  const formatDate = (createdAt) => {
    const date = new Date(createdAt);
    const formattedDate = date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true
    });
    return formattedDate
  }

  return (

    <div className="guest-book-display-container">

      <div className="guest-book-navigation">
        <Button 
        sx={{
          width: '5px',
          height: '50px'
        }}
          size='small'
          variant="contained"
          color="primary"
          startIcon={<RefreshIcon />}
          onClick={fetchMessages}
        ></Button>

        <Button 
        sx={{
          width: '5px',
          height: '50px'
        }}
          size='small'
          variant="contained"
          color="secondary"
          startIcon={<NavigateBeforeIcon />}
          onClick={ () => paginationFunc(Math.max(1, page - 1))}
        ></Button>

        <h1>{page}</h1>

        <Button 
        sx={{
          width: '5px',
          height: '50px'
        }}
          size='small'
          variant="contained"
          color="secondary"
          startIcon={<NavigateNextIcon />}
          onClick={ () => paginationFunc(page + 1)}
        ></Button>
      </div>

      {messages.slice(0).map((message, index) => (
        <div key={index} className={`message ${message.username === 'user' ? 'user-message' : 'other-message'}`}>
          <div className="profile-picture">
            <img src={message.avatar} alt="Profile" />
          </div>
          <div className="message-content">
            <div className="message-info">
              <span className="username">{message.username}</span>
              <span className="time-sent">{formatDate(message.createdAt)}</span>
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

