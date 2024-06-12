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

  console.log("logging data", data);

  try {
    // Retrieve existing tags from the database
    const existingTags = await Tag.find({});
    console.log("Logging all existingTags", existingTags);

    // Check for new tags in the request body and create them if they don't exist
    const newTagIds = [];

    if (data.tags) {
      for (const tag of data.tags) {
        const existingTag = existingTags.find((t) => t.name === tag.name);

        console.log("Logging existingTag", existingTag);
        if (!existingTag) {
          const newTag = await Tag.create({ name: tag.name });

          console.log("Loging new tag", newTag);
          newTagIds.push(newTag._id);
        } else {
          newTagIds.push(existingTag._id);
        }
      }
    }

    console.log("logging newTagsIds", newTagIds);
    console.log("Logging postId", postId);
    console.log("Logging data.status", data.status);

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $set: { tags: newTagIds, status: data.status } },
      { new: true, runValidators: true }
    );

    console.log("Logging updatedPost", updatedPost);

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
