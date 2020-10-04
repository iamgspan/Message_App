import React, { useState, useEffect } from 'react';
import './App.css';
import Message from './components/message-component/Message';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import firebaseDB from './firebaseConfig';
import firebase from 'firebase';

function App() {

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]); 
  const [ username, setUsername ] = useState('');             //State to remember the user
  
  //We can have multiple useEffect for different purposes.
  //Here we are listening for changes in our firestore database for any changes on add/remove messages.
  //runs once when the app loads
  //onSnapshot gives us the information everytime when a change happens in database.
  //Each message/username entry is a document(doc). So we iterate through all the documents and for every document, we fetch the doc.data()
  //This doc.data() gives us an object. So we get an array of objects.
  //realtime database listener
  //We are ordering by the timestamp in ascending order.
  useEffect(() => {
    firebaseDB.collection('Messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => doc.data()))
    })
  }, [])

  useEffect(() => {
    //const username = prompt('Enter your name...');          //----this name when enetered by user gets stored in the username variable. 
    setUsername(prompt('Please enter your name...'));         // So instead of creating new variable, we can set the user input in setUsername    
  }, [])


  const sendMessage = (e) => {
    e.preventDefault();                                       //prevents the page to refresh automatically everytime on send button hit

    //The below code stores the messages being sent in database
    //We are adding the timestamp so that we can display the messages in the order by timestamp
    firebaseDB.collection('Messages').add({
      username: username,
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    //all the functionality and logic for sending message goes here----------    
    setMessages([...messages, { username: username, message: input }]);              //we append each input to whatever exists initially
    setInput('');                                             //this clears the input field after sending the message
  }
  
  return (
    <div className="App">
      <h1>My ChatBox</h1>
      {/* We will be needing input field to type the message, a button to send the messsage, and the message itself. */}
      <form>
        <FormControl>        
          <InputLabel htmlFor="my-input">Enter your message...</InputLabel>
          <Input type="text" value={input} onChange={e => setInput(e.target.value) } />
          <Button type="submit" disabled={!input} onClick={sendMessage} >
            <SendIcon />
          </Button>
        </FormControl>

        {/* //Here we display the messages on the screen
            //iterating over messages array and displaying each message
            //this username we are passing as props, and we are mapping to the name property in message object
            //displaying the whole message as other people might send it. username Here is the one when we login */}        
        {
          messages.map(message => (            
            <Message username={username} message={message} />                                
          ))          
        }                  
      </form>
    </div>
  );
}

export default App;
