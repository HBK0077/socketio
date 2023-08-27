const socket = io("http://localhost:3030");
const messageContainer = document.getElementById("message-container");
const messageForm = document.getElementById("send-container");
const messageInput = document.getElementById("message-input");

const names = prompt("What is your name?");
appendMessage("You joined");
socket.emit('new-user', names);

socket.on("chat-message", data=>{
    // console.log("New user")
    console.log(data)
    appendMessage(`${data.names}: ${data.message}`);
})
socket.on("user-connected", name=>{
    // console.log("New user")
    appendMessage(`${name} connected`);
})
socket.on("user-disconnected", name=>{
    // console.log("New user")
    appendMessage(`${name} disconnected`);
})

messageForm.addEventListener("submit", e=>{
    e.preventDefault();
    const message = messageInput.value;
    //emit will send the message to the server.
    appendMessage(`You: ${message}`);
    socket.emit('send-chat-message', message);
    messageInput.value = "";
})

function appendMessage(message){
    const messageElement = document.createElement("div");
    messageElement.innerText = message;
    messageContainer.append(messageElement);
}