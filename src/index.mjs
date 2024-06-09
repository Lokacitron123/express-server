dotenv.config();

// Imports
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";

// Database Connection
import { connectDB } from "./configs/dbConnection.mjs";

// route imports
import usersRouter from "./routes/users.route.mjs";
import blogsRouter from "./routes/blogs.route.mjs";
import authRouter from "./routes/auth.route.mjs";

const PORT = process.env.PORT || 3000;

// Starts connection to DB
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, // Set to false to prevent users that visit from taking up memory storage
    resave: false,
    cookie: {
      maxAge: 60000 * 60,
    },
    store: MongoStore.create({ client: mongoose.connection.getClient() }), // Connects session to DB
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(authRouter);
app.use(usersRouter);
app.use(blogsRouter);

mongoose.connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Express is running on port: ${PORT}`);
  });
});
