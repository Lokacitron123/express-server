import mongoose, { Schema } from "mongoose";
import { Post } from "./posts.schema.mjs";
import { Comment } from "./comments.schema.mjs";

const profileSchema = new Schema(
  {
    bio: { type: String, maxlength: 500 },
    avatar: { type: String },
    social: {
      twitter: { type: String },
      linkedin: { type: String },
      website: { type: String },
    },
    location: { type: String },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "author", "user"], default: "user" },
    profile: profileSchema,
  },
  { timestamps: true }
);

// Cascade delete function
userSchema.pre("findByIdAndDelete", async function (next) {
  const userId = this.getQuery()["_id"];

  // Find all posts by the user
  const posts = await Post.find({ author: userId });

  // Delete all comments associated with the user's posts
  for (const post of posts) {
    await Comment.deleteMany({ post: post._id });
  }

  // Delete all posts by the user
  await Post.deleteMany({ author: userId });

  // Optionally, delete all comments made by the user
  await Comment.deleteMany({ author: userId });

  next();
});

export const User = mongoose.model("User", userSchema);
