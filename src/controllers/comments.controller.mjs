import { matchedData, validationResult } from "express-validator";
import { Comment } from "../schemas/comments.schema.mjs";
import { Post } from "../schemas/posts.schema.mjs";

export const createComment = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);
  const blogId = req.params.id;
  const userId = req.user._id;

  console.log("Logging data object", data);

  try {
    const comment = new Comment({
      content: data.content,
      author: userId,
      post: blogId,
    });

    await comment.save();

    await Post.findByIdAndUpdate(blogId, {
      $push: { comments: comment._id },
    });

    res.status(201).json({ message: "Comment created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  const commentId = req.params.id;

  try {
    const comment = await Comment.findByIdAndDelete({ _id: commentId });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Update the post where comment was made to ensure it isnt being refered to after deletion
    await Post.findByIdAndUpdate(comment.post, {
      $pull: { comments: commentId },
    });

    res
      .status(200)
      .json({ message: "Comment was successfully deleted", comment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
