import express from "express";
import multer from "multer";
import cors from "cors";

import mongoose from "mongoose";

import {
  registerValidator,
  loginValidator,
  postCreateValidation,
  commentCreateValidation,
} from "./validations.js";

import { checkAuth, handleValidationErrors } from "./utils/index.js";
import {
  UserControllers,
  PostControllers,
  CommentControllers,
} from "./controllers/index.js";

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("DB ok"))
  .catch((err) => console.log("DB error", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use("/upload", express.static("uploads"));
// 
//Image
app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/upload/${req.file.originalname}`,
  });
});

// User
app.get("/auth/me", checkAuth, UserControllers.getMe);
app.post(
  "/auth/login",
  loginValidator,
  handleValidationErrors,
  UserControllers.login
);
app.post(
  "/auth/register",
  registerValidator,
  handleValidationErrors,
  UserControllers.register
);

// posts
app.get("/posts", PostControllers.getAll);
app.get("/posts/:id", PostControllers.getOne);
app.post(
  "/posts",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControllers.create
);
app.get("/top", PostControllers.getTop);
app.delete("/posts/:id", checkAuth, PostControllers.remove);
app.patch(
  "/posts/:id/edit",
  checkAuth,
  postCreateValidation,
  handleValidationErrors,
  PostControllers.update
);

//tags
app.get("/tags", PostControllers.getLastTags);
app.get("/tags/:name", PostControllers.getSimilarTags);

comments
app.post("/posts/:id/comments", checkAuth, CommentControllers.createComment);
app.get("/comments", CommentControllers.getAllComment);
app.get("/posts/:id/comments", CommentControllers.getOneComment);

app.listen(process.env.PORT || 4444, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server ok");
});
