import { matchedData, validationResult } from "express-validator";
import { users } from "../utils/mockUsers.mjs";
import { User } from "../schemas/users.schema.mjs";
import { hashPassword } from "../utils/helpers.mjs";

// get all users
export const getAllUsers = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);

  try {
    let users;

    if (data.filter && data.value) {
      // Normalize the search value by trimming whitespace and converting to lowercase
      const searchValue = data.value.trim().toLowerCase();

      // Construct the query object
      const query = {
        [data.filter]: { $regex: searchValue, $options: "i" }, // case-insensitive search
      };

      // Fetch the filtered users
      users = await User.find(query);
    } else {
      // Fetch all users if no filter is provided
      users = await User.find();
    }

    return res.status(200).send(users);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Server error" });
  }
};

// get Single user
export const getSingleUser = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    return res
      .status(500)
      .send({ message: "Invalid Request. No id was provided" });
  }

  const reqUser = await User.findById(id).populate("profile");

  if (!reqUser) {
    // Send a 404 status if the user is not found
    res.status(404).send({ message: "Requested user not found" });
  } else {
    // Send the found user as a response
    res.status(200).send(reqUser);
  }
};

// create
export const createUser = async (req, res) => {
  // express-validator validation
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);

  // Set password in data to new hashedPassword
  data.password = await hashPassword(data.password);

  const newUser = await User.create({
    ...data,
  });

  return res.status(201).send(newUser);
};

// put
export const putUser = (req, res) => {
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
};

// Create/Update user profile
export const putUserProfile = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // matchedData returns an object from the validated request
  const data = matchedData(req);

  console.log("Logging data", data);

  const newProfile = {
    ...data,
  };

  const userId = req.params.id;

  try {
    // Update the user profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profile: newProfile },
      { new: true, runValidators: true }
    ).populate("profile");

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Send the updated user profile as the response
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the profile" });
  }
};

// patch
export const patchUser = (req, res) => {
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
};

// delete
export const deleteUser = (req, res) => {
  const {
    params: { id },
  } = req;

  const parsedId = parseInt(id);

  if (!parsedId) {
    return res.status(400).send({
      message: "Invalid Request - Please provide a correct Id format",
    });
  }

  const foundUserIndex = users.findIndex((user) => user.id === parsedId);

  if (foundUserIndex === -1) {
    return res
      .status(400)
      .send({ message: `No user found with the id: ${parsedId}` });
  }

  users.splice(foundUserIndex, 1);

  return res.status(200).send({
    message: `User with id ${parsedId} was successfully deleted`,
  });
};
