import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './components/message-component/Message'; //import Message component to be displayed
import { FormControl, IconButton, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebaseDB from './firebaseConfig';  //import firebase database
import firebase from 'firebase';
import FlipMove from 'react-flip-move';

function App() {

  const [input, setInput] = useState('');  
  const [messages, setMessages] = useState([]); 
  const [ username, setUsername ] = useState('');
  
  //We can have multiple useEffect for different purposes.
  //Here we are listening for changes in our firestore database for any changes on add/remove messages.
  //runs once when the app loads
  //onSnapshot gives us the information everytime when a change happens in database.
  //Each message/username entry is a document(doc). So we iterate through all the documents and for every document, we fetch the doc.data()
  //This doc.data() gives us an object. So we get an array of objects.
  //realtime database listener
  //We are ordering by the timestamp in ascending order.
  useEffect(() => {
    firebaseDB.collection('Messages').orderBy("timestamp", "asc").onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data() ));
    })
  }, [])
  
  useEffect(() => {
    //const username = prompt('Enter your name...');          //----this name when enetered by user gets stored in the username variable.
    setUsername(prompt("Please enter your name...")); // So instead of creating new variable, we can set the user input in setUsername
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    //We are adding the timestamp so that we can display the messages in the order by timestamp
    firebaseDB.collection("Messages").add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setMessages([...messages, {username:username, message:input}]); //we append each input to whatever exists initially
    setInput(''); //this clears the input field after sending the message
  }
  
  return (
    <div className="App">
      <div className='header-logo'>
        <h1>Friends and Gossip...</h1>
        <img src="https://image.shutterstock.com/image-vector/sphere-speech-bubble-logo-vector-600w-363494414.jpg" alt="logo" width="80" height="80"/>
      </div>      
      <p>Welcome <strong>{username}</strong> !! Send in your message to continue the chat...</p>
      <div className='container'>
        <form className='app__form'> 
          <FormControl className="app__formControl">
            <Input className='app__input' type='text' value={input} onChange={ e => setInput(e.target.value)} placeholder="Enter your message..." />
            <IconButton className='app__iconBtn' disabled={!input} type='submit' onClick={sendMessage}>
              <SendIcon />
            </IconButton>
          </FormControl>        
        </form>
        {/* //Here we display the messages on the screen, wrapped inside FlipMove for animation effect.
        //iterating over messages array and displaying each message
        //this username we are passing as props, and we are mapping to the name property in message object
        //displaying the whole message as other people might send it. username Here is the one when we login */}
        <FlipMove className='container'>
          {
            messages.map(message => (
              <Message username={username} message={message} />
            ))
          }
        </FlipMove>
      </div>
    </div>
  );
}

export default App;
