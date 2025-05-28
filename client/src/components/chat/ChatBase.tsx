"use client"
import { getSocket } from '@/lib/socket.config';
import React, { useEffect, useMemo } from 'react'
import { Button } from '../ui/button';
import { v4 as uuidV4 } from 'uuid'

const ChatBase = () => {

    let socket = useMemo(() =>{
        const socket = getSocket();

        return socket.connect();
    }, [])

    useEffect(() =>{

        socket.on("message", (data) =>{
            console.log("The socket message is", data)
        })

        return () => {
            socket.close()
        }
    })

    const handleClick = () => {
        socket.emit("message", {name: "vaibhav", id: uuidV4()})
    }
  return (
    <Button onClick={handleClick}>
        Send Message
    </Button>
  )
}

export default ChatBase