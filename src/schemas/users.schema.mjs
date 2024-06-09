import mongoose, { Schema } from "mongoose";

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

export const User = mongoose.model("User", userSchema);
