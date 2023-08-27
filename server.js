const users = {};
const io = require("socket.io")(3030,{
    cors:{
        origin: ['http://127.0.0.1:5500']
    }
})



io.on("connection", socket=>{
    socket.on("new-user", names =>{
        users[socket.id] = names
        socket.broadcast.emit("user-connected", names);
    })
    socket.on("send-chat-message", message =>{
        socket.broadcast.emit('chat-message', { message: message, names: users[socket.id] });
        //this will send the message to all the user who are connected to the server except for the one who is sending it.
    })
    socket.on("disconnect", () =>{
        socket.broadcast.emit("user-disconnected", users[socket.id])
        delete users[socket.id] 
        
    })
});