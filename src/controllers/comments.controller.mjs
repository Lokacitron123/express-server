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

    res.status(201).json({ message: "Post created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
