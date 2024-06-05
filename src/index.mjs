dotenv.config();

// Imports
import express from "express";
import dotenv from "dotenv";

const PORT = process.env.PORT || 3000;

const users = [
  { id: 1, username: "Johan", lastname: "Lindell" },
  { id: 2, username: "Erik", lastname: "Larsson" },
  { id: 3, username: "Gösta", lastname: "Ekman" },
  { id: 4, username: "Emma", lastname: "Karlsson" },
  { id: 5, username: "Lisa", lastname: "Westman" },
  { id: 6, username: "Lotta", lastname: "Bråkmann" },
];

const app = express();
app.use(express.json()); // to parse incoming JSON format in http requests

app.get("/api/users", (req, res) => {
  console.log(req.query);
  // Destructure query
  const {
    query: { filter, value },
  } = req;

  if (filter && value) {
    const filteredUser = users.filter((user) => user[filter].includes(value));

    return res.status(200).send(filteredUser);
  }

  return res.status(201).send(users);
});

app.get("/api/users/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!id) {
    return res
      .status(500)
      .send({ message: "Invalid Request. No id was provided" });
  }

  const reqUser = users.find((user) => user.id === id);

  if (!reqUser) {
    // Send a 404 status if the user is not found
    res.status(404).send({ message: "Requested user not found" });
  } else {
    // Send the found user as a response
    res.status(200).send(reqUser);
  }
});

// Post
app.post("/api/users", (req, res) => {
  console.log("logging post request: ", req.body);
  const {
    body: { username, lastname },
  } = req;

  const newUser = {
    // - 1 to remove the 0 index
    id: users[users.length - 1].id + 1,
    username: username,
    lastname: lastname,
  };

  users.push(newUser);

  return res.status(201).send(newUser);
});

// Put

app.put("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res
      .status(400)
      .send({ message: "Invalid Request - Please provide a number" });
  }

  // Find the index of the user object with the given id
  const userIndex = users.findIndex((user) => user.id === parsedId);

  // If user with the given id is not found, return a 404 error
  if (userIndex === -1) {
    return res.status(404).send({ message: "User not found" });
  }

  // Update the user object with the new data from the request body
  users[userIndex] = {
    ...users[userIndex], // Copy the existing user data
    ...body, // Update with the new data from the request body
  };

  // Return the updated user object
  return res
    .status(200)
    .send({ message: "User successfully updated", user: users[userIndex] });
});

// Patch
app.patch("/api/users/:id", (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (isNaN(parsedId)) {
    return res
      .status(400)
      .send({ message: "Invalid Request - Please provide a number" });
  }

  const userIndex = users.findIndex((user) => user.id === parsedId);

  if (userIndex === -1) {
    return res.status(404).send({ message: "User not found" });
  }

  users[userIndex] = {
    ...users[userIndex],
    ...body,
  };

  res
    .status(200)
    .send({ message: "User successfully updated", user: users[userIndex] });
});

// Delete
app.delete("/api/users/:id", (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (!parsedId) {
    return res.status(400).send({
      message: "Invalid Request - Please provide a correct Id format",
    });
  }

  const foundUser = users.find((user) => user.id === parsedId);

  if (!foundUser) {
    return res
      .status(400)
      .send({ message: `No user found with the id: ${parsedId}` });
  }

  // Approach 1: Delete with findIndex and splice
  // const foundUserIndex = users.findIndex((user) => user.id === parsedId);
  // users.splice(foundUserIndex, 1);

  // Approach 2: Delete with filter
  users.filter((user) => user.id !== foundUser.id);

  return res.status(200).send({
    message: `User with id ${parsedId} was successfully deleted`,
  });
});

// Server
app.listen(PORT, () => {
  console.log(`Express is running on port: ${PORT}`);
});
