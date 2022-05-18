import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Button, TextField } from "@mui/material/";
import { Conversation } from "../components/Conversation";
import { Message } from "../components/Message";
import axios from "axios";

import("../style/Socket.css");

const socket = io.connect("http://localhost:5000");

export const Socket = () => {
  const username = localStorage.getItem("username");

  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [allMessages, setAllMessages] = useState([]);
  const [newMessages, setNewMessages] = useState([]);

  console.log(currentChat);

  useEffect(() => {
    socket.emit("addUser", username);

    socket.on("getUsers", (allusers) => {
      console.log(allusers);
    });
  }, [username]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/conversations/${username}`)
      .then((result) => {
        setConversation(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/messages/${currentChat._id}`)
      .then((result) => {
        setAllMessages(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentChat]);

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!currentChat._id) {
      return;
    }

  
    axios
      .post(`http://localhost:5000/messages`, {
        sender: username,
        text: newMessages,
        conversationId: currentChat._id,
      })
      .then((result) => {
        setAllMessages([...allMessages, result.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="main-wrapper">
      <div className="socket-sidemenu-left">
        {conversation.map((items) => {
          return (
            <>
              <div onClick={() => setCurrentChat(items)}>
                {currentChat ? (
                  <Conversation conversation={items}></Conversation>
                ) : (
                  <p>No Conversation</p>
                )}
              </div>
            </>
          );
        })}
      </div>

      <div className="chat-wrapper">
        {allMessages.map((items) => {
          return <Message message={items}></Message>;
        })}
        <div className="chat-input-wrapper">
          <TextField
            value={newMessages}
            style={{ marginTop: "20px" }}
            id="outlined-basic"
            label="Chat here"
            variant="outlined"
            onChange={(e) => setNewMessages(e.target.value)}
          />
          <Button variant="contained" onClick={handelSubmit}>
            SEND MESSAGE
          </Button>
        </div>
      </div>
    </div>
  );
};
