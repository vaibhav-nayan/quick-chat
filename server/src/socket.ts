import { Server, Socket } from "socket.io"
import prisma from "./config/db.config.js"

interface CustomSocket extends Socket {
    room?: string
}

export const setupSocket = (io: Server) =>{

    io.use((socket : CustomSocket, next) =>{
        const room = socket.handshake.auth.room

        if(!room) {
            return next(new Error("Invalid room"))
        }

        socket.room = room
        next()
    })

    io.on("connection", (socket: CustomSocket) =>{

        //join the room
        socket.join(socket.room)

        // console.log("The socket connected..", socket.id);

        socket.on("message", async (data) =>{
            await prisma.chats.create({
                data: data
            })
            // socket.broadcast.emit("message", data)
            socket.to(socket.room).emit("message", data)
        })

        socket.on("disconnect", () => {
            console.log("The socket disconnected..", socket.id);
        })
    })
}