const express = require('express');
const http = require('http');
const {Server} = require('socket.io');
const ACTIONS = require('./src/actions');
const path = require('path');
const app  = express();
const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('build'));

app.use((req,res,next) => {
    res.sendFile(path.join(__dirname,'build','index.html'));
})


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


   socket.on(ACTIONS.JOIN,({roomId,username})=>{

    userSocketMap[socket.id] = username;
   
    socket.join(roomId.roomId);
    const clients = getAllConnectedClients(roomId.roomId);
    
    clients.forEach(({socketId})=>{
        
        io.to(socketId).emit(ACTIONS.JOINED,{
            clients,
            username,
            socketId:socket.id
        })
    })

   });

   socket.on(ACTIONS.CODE_CHANGE,({code,roomId}) => {
       
    socket.in(roomId.roomId).emit(ACTIONS.CODE_CHANGE,{code},()=>{
        
    })
   })

   socket.on(ACTIONS.SYNC_CODE,({code,socketId}) => {
 io.to(socketId).emit(ACTIONS.CODE_CHANGE,{code})
})

   socket.on('disconnecting',()=>{
       const rooms = Array.from(socket.rooms);
       rooms.forEach((roomId) => {
        socket.in(roomId).emit(ACTIONS.DISCONNECTED, {
           
            socketId:socket.id,
            username:userSocketMap[socket.id]
            
        })
       });

       delete userSocketMap[socket.id];


   })


});




server.listen(port, (err) => {
    if(err){
        console.error(err);
        return ;
    }
    console.log("Successfully Listening to PORT ",port);
})

