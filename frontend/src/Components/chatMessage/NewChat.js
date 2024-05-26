import React, { useState } from "react";

const NewChat = ({ joinChat }) => {
  const [chatName, setChatName] = useState("");

  const handleJoinChat = () => {
    if (chatName.trim() !== "") {
      joinChat(chatName);
      setChatName("");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Chat Name"
        value={chatName}
        onChange={(e) => setChatName(e.target.value)}
      />
      <button onClick={handleJoinChat}>Join Chat</button>
    </div>
  );
};

export default NewChat;
