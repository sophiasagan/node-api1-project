var express = require("express");
var app = express();

let users = [
    { id: "1", name: "Sophia Jung", bio: "Computer Science Student" },
    { id: "2", name: "Ken Jung", bio: "Personal Trainer" },
    { id: "3", name: "Sara Jung", bio: "Deceased"}
];

// GET
function getUsers() {
    return users;
  }
  
  // GET
  function getUserById(id) {
    return users.find(u => u.id === id);
  }
  
  // POST
  async function createUser(data) {
    const payload = {
      id: String(users.length + 1),
      ...data
    };
  
    users.push(payload);
    return payload;
  }
  
  // PATCH
  function updateUser(id, data) {
    const index = users.findIndex(u => u.id === id);
    users[index] = {
      ...users[index],
      ...data
    };
  
    return users[index];
  }
  
  function deleteUser(id) {
    users = users.filter(u => u.id != id);
  }
  
  module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
  };