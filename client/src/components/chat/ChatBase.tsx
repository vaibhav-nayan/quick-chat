"use client"
import React, { useEffect, useMemo, useState } from 'react'
import ChatSidebar from './ChatSidebar';
import ChatNav from './ChatNav';
import ChatUserDialog from './ChatUserDialog';
import Chats from './Chats';

const ChatBase = ({group, users, oldMessages}: {
    group: ChatGroupType,
    users: Array<GroupChatUserType>,
    oldMessages: Array<MessageType> | []
}) => {

  const [open , setOpen] = useState(true);
  const [chatUser, setChatUser] = useState<GroupChatUserType>();

  useEffect(() => {
    const data = localStorage.getItem(group.id as string);
    if(data) {
      const pData = JSON.parse(data);
      setChatUser(pData);    }
  }, [chatUser]);
     
  return (
    <div className='flex'>
        <ChatSidebar users={users} />
        <div className='w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white'>
          {open? <ChatUserDialog open={open} setOpen={setOpen} group={group}/>: 
          <ChatNav chatGroup={group} users={users}/>
          }

          <Chats group={group}  chatUser={chatUser} oldMessages={oldMessages}/>
        </div>
    </div>
  )
}

export default ChatBase