import React, { useEffect, useState } from "react";

export const Message = (props) => {
  const [realMesssage, setRealMesssage] = useState([]);

  useEffect(() => {
    setRealMesssage(props.message.text);
  }, [props.message.text]);

  return (
    <div
      className="message-wrapper"
      style={{
        minWidth: "200px",
        minHeight: "20px",
        backgroundColor: "white",
        padding: "10px",
        marginTop: "20px",
      }}
    >
      {realMesssage}
    </div>
  );
};
