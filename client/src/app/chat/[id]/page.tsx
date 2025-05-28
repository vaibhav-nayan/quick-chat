
import ChatBase from '@/components/chat/ChatBase';
import { fetchChats } from '@/fetch/chatsFetch';
import { fetchChatGroup, fetchChatUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation';
import React from 'react'

const Chat = async ({params} : {params: {
    id: string
}}) => {

  if(params.id.length !== 36){
    return notFound();
  }
  const group: ChatGroupType | null = await fetchChatGroup(params.id);

  if(group === null){
    return notFound();
  }

  const users: Array<GroupChatUserType> | [] = await fetchChatUsers(params.id)

  const chats : Array<MessageType> | [] = await fetchChats(params.id);

  return (
    <>
        <ChatBase group={group} users={users} oldMessages={chats} />
    </>
  )
}

export default Chat