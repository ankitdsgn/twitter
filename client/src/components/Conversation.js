import React, { useEffect, useState } from "react";
import axios from "axios";
import("../style/Socket.css");

export const Conversation = (props) => {
  const { senderUsername, receiverUsername } = props.conversation;
  const username = localStorage.getItem("username");
  const [friendusername, setFriendusername] = useState([]);
  const [friendname, setFriendname] = useState([]);

  useEffect(() => {
    if (senderUsername === username) {
      setFriendusername(receiverUsername);
    } else if (receiverUsername === username) {
      setFriendusername(senderUsername);
    }

    axios
      .get(`http://localhost:5000/users/?username=${friendusername}`)
      .then((result) => {
        setFriendname(result.data[0].username);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [friendusername, senderUsername, username, receiverUsername]);

  return (
    <div
      className="conversation-wrapper"
      style={{ marginTop: "50px", marginLeft: "50px" }}
    >
      <p style={{ color: "white" }}>{friendname}</p>
    </div>
  );
};
