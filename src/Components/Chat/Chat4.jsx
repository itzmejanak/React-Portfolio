// src/Components/Chat/Chat4.jsx
import React from 'react';

const Chat4 = () => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe 
        src="/chat/index.html" 
        style={{
          width: '100%',
          height: '100vh',
          border: 'none',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)'
        }}
        title="DeepSeek AI Chat"
      />
    </div>
  );
};

export default Chat4;