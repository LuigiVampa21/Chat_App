const users = [];

// Join user to chat
const userJoin = function (id, username, room) {
  const user = { id, username, room };

  users.push(user);

  return user;
};

// Get current user

const getCurrentUser = function (id) {
  return users.find(user => user.id === id);
};

// User leaves chat
const userLeave = function (id) {
  const index = users.findIndex(user => user.id == id);
  if (index == -1) return;
  return users.splice(index, 1)[0];
};

// Get room users
const getRoomUsers = function (room) {
  return users.filter(user => user.room === room);
};

module.exports = { userJoin, getCurrentUser, userLeave, getRoomUsers };
