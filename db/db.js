const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser(username, password, isAdmin) {
  console.log(`Creating user: ${username}`);
  await prisma.users.create({
    data: {
      username: username,
      password: password,
      isAdmin: isAdmin,
    },
  });
}

async function getUserByUsername(username) {
  console.log(`Fetching user by username: ${username}`);
  return await prisma.users.findUnique({
    where: { username: username },
  });
}

async function getPosts() {
  console.log("Fetching all posts with authors...");
  const posts = await prisma.posts.findMany({
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return posts;
}

async function getPostById(postId) {
  console.log(`Fetching post by ID: ${postId}`);
  return await prisma.posts.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
}

async function getCommentsByPostId(postId) {
  console.log(`Fetching comments for post ID: ${postId}`);
  const comments = await prisma.comments.findMany({
    where: { postId: postId },
    include: {
      author: {
        select: {
          username: true,
        },
      },
    },
  });
  return comments;
}

async function createPost({ title, content, userId, published }) {
  console.log(`Adding post: ${title}`);
  return await prisma.posts.create({
    data: {
      title: title,
      content: content,
      published: published,
      author: {
        connect: { id: userId },
      },
    },
  });
}

module.exports = {
  createUser,
  getUserByUsername,
  getPosts,
  getPostById,
  getCommentsByPostId,
  createPost,
};
