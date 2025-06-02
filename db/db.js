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

async function updatePost(postId, title, content, published) {
  console.log(`Editing post ID: ${postId}`);
  console.log(
    `Editing post: ${title}, content: ${content}, published: ${published}`,
  );
  return await prisma.posts.update({
    where: { id: postId },
    data: {
      title: title,
      content: content,
      published: published,
    },
  });
}

async function deletePost(postId) {
  console.log(`Deleting post ID: ${postId}`);
  await prisma.posts.delete({
    where: { id: postId },
  });
}

async function createComment({ postId, userId, content }) {
  console.log(`Adding comment to post ID: ${postId}`);
  return await prisma.comments.create({
    data: {
      content: content,
      posts: {
        connect: { id: postId },
      },
      author: userId ? { connect: { id: userId } } : undefined,
    },
  });
}

async function deleteComment(commentId) {
  console.log(`Deleting comment ID: ${commentId}`);
  await prisma.comments.delete({
    where: { id: commentId },
  });
}

module.exports = {
  createUser,
  getUserByUsername,
  getPosts,
  getPostById,
  getCommentsByPostId,
  createPost,
  updatePost,
  deletePost,
  createComment,
  deleteComment,
};
