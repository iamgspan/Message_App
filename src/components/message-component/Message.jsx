import { Card, CardContent, Typography } from '@material-ui/core';
import React, {forwardRef} from 'react'
import './Message.css';

//Here we use forwardRef to track what's changing/moving/flipping.
//We need to change the functional component into ES6 format and wrap in inside forwardRef().
//So we basically forwardRef is a higher order function wrapping the functionalcomponent within it.
//Here we get a ref which provides a reference to an object.
//We need to attach this ref to the div which we want to keep track of, so it knows what elements are changing/moving.
//This is an example of higher order component
const Message = forwardRef( ({username, message}, ref) => {
    const isUser = username === message.username;


    return (
        <div ref={ref} className={`message__card ${isUser && "message__user"}`}>
            <Card className={isUser ? "message__selfLoginCard" : "message__guestUserCard"}>
                <CardContent>
                    <Typography variant='p' component='p' >
                    <strong>{!isUser && `${message.username || "Unknown User"}: `}</strong>{message.message}
                    </Typography>
                </CardContent>
            </Card>            
        </div>
    )
})

export default Message
