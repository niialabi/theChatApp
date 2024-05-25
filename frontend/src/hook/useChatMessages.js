import { useState } from 'react';

const useChatMessages = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const selectConversation = (conversation) => {
    setSelectedConversation(conversation);
  };

  return {
    conversations,
    selectedConversation,
    selectConversation,
    setConversations,
  };
};

export default useChatMessages;