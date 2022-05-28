const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const ACTIONS = require('./src/actions');
const app  = express();
const PORT = 5000;

const server = http.createServer(app);
const io = new Server(server);

const userSocketMap = {}

const getAllConnectedClients = (roomId)=> {
    return Array.from(io.sockets.adapter.rooms.get(roomId)||[]).map((socketId)=>{
        return {
            socketId,
            username:userSocketMap[socketId]
        }
    })
}

io.on('connection',(socket)=> {
    console.log('socket connected',socket.id);

   socket.on(ACTIONS.JOIN,({roomId,username})=>{

    userSocketMap[socket.id] = username;
    console.log(roomId.roomId);
    socket.join(roomId.roomId);
    const clients = getAllConnectedClients(roomId.roomId);
    console.log(clients);
    clients.forEach(({socketId})=>{
        console.log(username);
        io.to(socketId).emit(ACTIONS.JOINED,{
            clients,
            username,
            socketId:socket.id
        })
    })

   });

   socket.on(ACTIONS.CODE_CHANGE,({code,roomId}) => {
       console.log(roomId.roomId);
    socket.in(roomId.roomId).emit(ACTIONS.CODE_CHANGE,{code},()=>{
        console.log('sent',code);
    })
   })

   socket.on('disconnecting',()=>{
       const rooms = Array.from(socket.rooms);
       rooms.forEach((roomId) => {
           console.log(roomId);
        socket.in(roomId.roomId).emit(ACTIONS.DISCONNECTED, {
           
            socketId:socket.id,
            username:userSocketMap[socket.id]
            
        })
       });

       delete userSocketMap[socket.id];


   })


});




server.listen(PORT, (err) => {
    if(err){
        console.log(err);
        return ;
    }
    console.log("Successfully Listening to PORT ",PORT);
})

