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

async function getPublicPosts(req, res, next) {
  try {
    const posts = await db.getPublicPosts();
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

async function editPost(req, res, next) {
  try {
    const postId = parseInt(req.params.id);
    const { title, content, published } = req.body;
    const post = await db.updatePost(postId, title, content, published);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    });
  } catch (err) {
    console.error("Error editing post:", err);
    next(err);
  }
}

async function deletePost(req, res, next) {
  try {
    const postId = parseInt(req.params.id);
    await db.deletePost(postId);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Error deleting post:", err);
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

async function createComment(req, res, next) {
  try {
    console.log("Adding comment:", req.body);
    const { postId, userId, content } = req.body;
    console.log("Post ID:", postId, "User ID:", userId, "Content:", content);
    const comment = await db.createComment({
      postId,
      userId,
      content,
    });
    res.status(201).json({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      author: comment.authorId,
    });
  } catch (err) {
    console.error("Error adding comment:", err);
    next(err);
  }
}

async function deleteComment(req, res, next) {
  try {
    const commentId = parseInt(req.params.id);
    await db.deleteComment(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    next(err);
  }
}

module.exports = {
  getPosts,
  getPublicPosts,
  getPostById,
  getCommentsByPostId,
  addPost,
  editPost,
  deletePost,
  createComment,
  deleteComment,
};
