import { matchedData, validationResult } from "express-validator";
import { Tag } from "../schemas/tags.schema.mjs";

export const getAllTags = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const data = matchedData(req);

  try {
    if (condition) {
    } else {
    }

    const tags = await Tag.find({});

    res.status(200).send(tags);
  } catch (error) {
    res
      .status(400)
      .send({ error: "An error occured while retrieving the tags" });
  }
};

export const createTag = async (req, res) => {};

export const deleteTag = async (req, res) => {};
