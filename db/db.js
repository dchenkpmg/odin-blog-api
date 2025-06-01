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
module.exports = {
  createUser,
  getUserByUsername,
  getPosts,
};
