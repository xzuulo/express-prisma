import express from "express";
import { db } from "../prisma/db";

const router = express.Router();

router.get("/", async (req, res) => {
  res.status(200).json(await db.orm.public.User.include("posts").all());
});
router.get("/:id", async (req, res) => {
  res
    .status(200)
    .json(
      await db.orm.public.User.where({ id: req.params.id })
        .include("posts")
        .all(),
    );
});
router.post("/", async (req, res) => {
  const { email, username, name } = req.body;
  const userData = { email, username, name };

  if (email) userData.email = email;
  else
    return res
      .status(400)
      .json({ success: false, details: "Некорректные данные" });

  if (username) userData.username = username;
  if (name) userData.name = name;

  const newUser = await db.orm.public.User.create(userData);
  res.status(201).json(newUser);
});
router.patch("/:id", async (req, res) => {
  const { email, username, name } = req.body;
  const dataToUpdate = { email, username, name };

  if (email) dataToUpdate.email = email;
  if (username) dataToUpdate.username = username;
  if (name) dataToUpdate.name = name;

  const updatedUser = await db.orm.public.User.where({
    id: req.params.id,
  }).update(dataToUpdate);

  res.status(200).json(updatedUser);
});
router.delete("/:id", async (req, res) => {
  return res
    .status(200)
    .json(await db.orm.public.User.where({ id: req.params.id }).delete());
});

export default router;
