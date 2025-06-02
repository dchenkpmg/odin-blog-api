const db = require("../db/db");

async function getPosts(req, res, next) {
  try {
    const posts = await db.getPosts();
    res.status(200).json(
      posts.map((post) => ({
        id: post.id,
        title: post.title,
        content: post.content,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        author: post.author,
        published: post.published,
      })),
    );
  } catch (error) {
    next(error);
  }
}

async function addPost(req, res, next) {
  try {
    const { title, content, userId, published } = req.body;
    await db.createPost({
      title,
      content,
      userId,
      published,
    });
    res.status(201).json({ message: "Post created successfully" });
  } catch (err) {
    console.error("Error creating post:", err);
    next(err);
  }
}

async function getPostById(req, res, next) {
  try {
    const postId = parseInt(req.params.id);
    const post = await db.getPostById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      author: post.author,
      published: post.published,
    });
  } catch (err) {
    next(err);
  }
}

async function getCommentsByPostId(req, res, next) {
  try {
    const postId = parseInt(req.params.id);
    const comments = await db.getCommentsByPostId(postId);
    if (!comments) {
      return res
        .status(404)
        .json({ message: "Comments not found for this post" });
    }
    console.log("Comments fetched successfully:", comments);
    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getPosts,
  getPostById,
  getCommentsByPostId,
  addPost,
};
