// Create and configure the server
const express = require("express");
const server = express();
// const cors = require("cors");
// server.use(express.json());
// server.use(cors()); // For the stretch
// const port = 5000;
const db = require("./db.js");

server.use(express.json());

server.post("/users", (req, res) => {
    if (!req.body.name || !req.body.bio) {
        return res
            .status(400)
            .json({ errorMessage: "Please provide name and bio for the user." });
    }

    const newUser = db.createUser({
        name: req.body.name,
        bio: req.body.bio
    });
    if (!req.body.name || !req.body.bio) {
        return res
            .status(500)
            .json({
                errorMessage: "There was an error while saving the user to the database"
            });
    } else {
        return res.status(201).json({ ...newUser });
    }
});

server.get("/", (req, res) => {
    res.json({ message: "Working :)" });
});

server.get("/users", (req, res) => {

    const users = db.getUsers();
    res.status(200).json(users);



    if (!users) {
        return res
            .status(500)
            .json({ errorMessage: "The users information could not be retrieved." });
    }

})

server.get("/users/:id", (req, res) => {
    const userId = req.params.id;
    const user = db.getUserById(userId);

    if (!user) {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        });
    }

    res.json(user);
    if (!user) {
        res.status(500).json({
            errorMessage: "The user information could not be retrieved."
        });
    }
});

server.put("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);
    if (user) {
        const updatedUser = db.updateUser(user.id, {
            name: req.body.name || user.name
        });

        res.json(updatedUser);
    } else {
        res.status(404).json({
            message: "User not found"
        });
    }
});

server.delete("/users/:id", (req, res) => {
    const user = db.getUserById(req.params.id);

    if (user) {
        db.deleteUser(user.id);
        // 204 is just a successful empty response
        return res.status(204).end();
    } else {
        res.status(404).json({
            message: "The user with the specified ID does not exist."
        });
        if (user.id) {
            return res.status(500).json({
                errorMessage: "The user could not be removed"
            });
        }
    }
});


server.listen(5000, () => {
    console.log("server started at port 5000");
});
