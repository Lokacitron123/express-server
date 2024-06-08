import passport from "passport";
import { Strategy } from "passport-local";
import { users } from "../utils/mockUsers.mjs";
import { User } from "../schemas/users.schema.mjs";

// Responsible for taking the validated user and storing into session
passport.serializeUser((user, done) => {
  console.log(`Inside Serialize User`);
  console.log(user);

  done(null, user.id);
});

// Responsible for finding the user object and attaching it to the request object
passport.deserializeUser(async (id, done) => {
  console.log(`Inside Deserialize User`);
  console.log(`Deserializing UserID ${id}`);
  try {
    const findUser = await User.findById(id);

    if (!findUser) {
      throw new Error("User not found");
    }

    done(null, findUser);
  } catch (error) {
    done(error, null);
  }
});

// By Default passport will look for a username and password field in the request body post request endpoint
// Passport will then pass it in as arguments to the callback function of the Strategy instance.
// Strategy can take in an object argument where you can specify the username and password fields if
// your authentication uses other fieldnames than username and password for authentication instead
// E.g.   new Strategy({ usernameField: "email" }, (username, password, done) => {...})
// The callback function is responsible for validating the user
export default passport.use(
  new Strategy(async (username, password, done) => {
    try {
      const findUser = await User.findOne({ username: username });

      if (!findUser) {
        throw new Error("User not found");
      }

      if (findUser.password !== password) {
        throw new Error("Invalid Credentials");
      }

      done(null, findUser);
    } catch (error) {
      done(err, null);
    }
  })
);
