import ChatBase from '@/components/chat/ChatBase'
import React from 'react'

const Chat = ({params} : {params: {
    id: string
}}) => {

    console.log("The group id is ", params.id)
  return (
    <>
        <div>Hello I am Chatting</div>
        <ChatBase/>
    </>
  )
}

export default Chat