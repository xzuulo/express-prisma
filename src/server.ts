import express from "express";
import { config } from "./config/index";
import morgan from "morgan";

import usersRouter from "./routes/usersRouter";
import postsRouter from "./routes/postsRouter";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/users", usersRouter);
app.use("/posts", postsRouter);

app.listen(config.port, () => {
  console.log(`Сервер запущен: http:127.0.0.1:${config.port}`);
});
