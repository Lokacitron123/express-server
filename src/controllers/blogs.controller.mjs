import { matchedData, validationResult } from "express-validator";
import { Tag } from "../schemas/tags.schema.mjs";
import { Post } from "../schemas/posts.schema.mjs";

export const getBlogs = (req, res) => {
  if (req.cookies.hello && req.cookies.hello === "world") {
    return res.status(200).send([{ id: 123, name: "Bananas", price: 19 }]);
  }

  return res
    .status(400)
    .send({ message: "Sorry, the correct cookie was missing. " });
};

// Create a blog post
export const createBlog = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);

  const { _id } = req.user;

  try {
    const newPost = await Post.create({
      ...data,
      author: _id,
    });

    res.status(201).send(newPost);
  } catch (error) {
    res
      .status(400)
      .send({ error: "An error occurred while creating the post" });
  }
};

export const editBlog = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  const postId = req.params.id;

  try {
    // Retrieve existing tags from the database
    const existingTags = await Tag.find({});

    // Check for new tags in the request body and create them if they don't exist
    const newTagIds = [];

    if (data.tags) {
      for (const tag of data.tags) {
        const existingTag = existingTags.find((t) => t.name === tag.name);

        if (!existingTag) {
          const newTag = await Tag.create({ name: tag.name });

          newTagIds.push(newTag._id);
        } else {
          newTagIds.push(existingTag._id);
        }
      }
    }

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: { tags: newTagIds, status: data.status } },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.status(200).send(updatedPost);
  } catch (error) {
    res
      .status(400)
      .send({ error: "An error occurred while updating the post" });
  }
};

// Edit the content of a blog post
export const editBlogContent = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const data = matchedData(req);
  const postId = req.params.id;

  try {
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { ...data },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedPost) {
      return res.status(404).send({ message: "Post not found" });
    }

    res.status(200).send(updatedPost);
  } catch (error) {
    res
      .status(400)
      .send({ error: "An error occurred while updating the post's content" });
  }
};

// Delete
export const deletePostById = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByIdAndDelete({ _id: postId });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    return res
      .status(200)
      .json({ message: "Post and associative comments deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};
