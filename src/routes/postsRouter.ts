import express from "express";
import { db } from "../prisma/db";

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json(await db.orm.public.Post.all());
});
router.get("/:id", async (req, res) => {
  res
    .status(200)
    .json(await db.orm.public.Post.where({ id: req.params.id }).all());
});
router.post("/", async (req, res) => {
  const { title, content, authorId } = req.body;
  const postData = { title, content, authorId };

  if (authorId && title) {
    postData.authorId = authorId;
    postData.title = title;
  } else {
    return res
      .status(400)
      .json({ success: false, details: "Некорректные данные" });
  }
  if (content) postData.content = content;

  const newPost = await db.orm.public.Post.create(postData);
  res.status(201).json(newPost);
});
router.patch("/:id", async (req, res) => {
  const { title, content, authorId } = req.body;
  const dataToUpdate = { title, content, authorId };

  if (title) dataToUpdate.title = title;
  if (content) dataToUpdate.content = content;
  if (authorId) dataToUpdate.authorId = authorId;

  const updatedPost = await db.orm.public.Post.where({
    id: req.params.id,
  }).update(dataToUpdate);

  res.status(200).json(updatedPost);
});
router.delete("/:id", async (req, res) => {
  return res
    .status(200)
    .json(await db.orm.public.Post.where({ id: req.params.id }).delete());
});

export default router;
