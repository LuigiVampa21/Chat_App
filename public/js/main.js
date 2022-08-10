const chatForm = document.getElementById("chat-form");
const chatContainer = document.querySelector(".chat-messages");
const roomNames = document.querySelector("#room-name");
const usersList = document.querySelector("#users");
console.log(roomNames, usersList);

// Get username and room from URL
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join chatRoom
socket.emit("joinRoom", { username, room });
// socket.emit("joinRoom", `${username} joined ${room}`);

// Get room and users
socket.on("roomUsers", ({ room, users }) => {
  console.log("hi");
  outputRoomName(room);
  outputUsers(users);
});

socket.on("message", message => {
  //   Show message in discussion
  outputMessage(message);
  //   Scroll down to last message
  chatContainer.scrollTop = chatContainer.scrollHeight;
});

// Message submit
chatForm.addEventListener("submit", e => {
  e.preventDefault();

  //   Get message text
  const msg = e.target.elements.msg.value;

  //   Emit a message
  socket.emit("chatMessage", msg);

  //   Clear
  e.target.elements.msg.value = "";
  e.target.elements.msg.blur();
});

const outputMessage = function (message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<div class="message">
    <p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">${message.text}</p>
  </div>`;
  chatContainer.insertAdjacentElement("beforeend", div);
};

// Add room name to DOM
const outputRoomName = function (room) {
  roomNames.innerText = room;
};

// Add users to DOM
const outputUsers = function (users) {
  usersList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.innerText = user.username;
    usersList.appendChild(li);
  });
};

// User Log out
document.getElementById("leave-btn").addEventListener("click", () => {
  const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
  if (leaveRoom) {
    window.location = "../index.html";
  } else return;
});
