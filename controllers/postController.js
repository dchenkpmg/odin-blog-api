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
        username: post.author.username,
        published: post.published,
      })),
    );
  } catch (error) {
    next(error);
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
      username: post.author.username,
      published: post.published,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getPosts,
  getPostById,
};
