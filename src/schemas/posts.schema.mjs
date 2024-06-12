import mongoose, { Schema } from "mongoose";
import { Comment } from "./comments.schema.mjs";

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

// Cascading delete function
postSchema.pre("findOneAndDelete", async function (next) {
  const postId = this.getQuery()["_id"];
  await Comment.deleteMany({ post: postId });
  next();
});

export const Post = mongoose.model("Post", postSchema);
