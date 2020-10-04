import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './Message.css';

function Message({message, username}) {

    const isUser = username === message.username;
    return (
        <div className={`message__card ${isUser && 'message__user'}`}>
            <Card className={isUser ? 'message__selfLoginCard' : 'message__guestUserCard'}>
                <CardContent>                  
                    <Typography color="white" variant="p" component="p"> {message.username}: {message.message} </Typography>
                </CardContent>                
            </Card>           
        </div>
    )
}

export default Message;
