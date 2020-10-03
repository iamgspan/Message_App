import React, { useState } from 'react';
import './App.css';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = (e) => {
    //all the functionality and logic for sending message goes here----------
    console.log('in sendMessage function');
    
  }
  
  return (
    <div className="App">
      <h1>My Messaging app</h1>
      {/* We will be needing input field to type the message, a button to send the messsage, and the message itself. */}
      <input type="text" value={input} onChange={e => setInput(e.target.value) } />
      <button type="submit" onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
