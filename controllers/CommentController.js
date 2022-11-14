import CommentModel from "../models/Comment.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const doc = new CommentModel({
      text: req.body.text,
      post_id: postId,
      user: req.userId,
    });
    const comment = await doc.save();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "The comment isn't created",
    });
  }
};

export const getAllComment = async (req, res) => {
  try {
    const comment = await CommentModel.find().populate("user").exec();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get the comments",
    });
  }
};

export const getOneComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const comment = await CommentModel.find({ post_id: postId })
      .populate("user")
      .exec();
    res.json(comment);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Failed to get the comments",
    });
  }
};
