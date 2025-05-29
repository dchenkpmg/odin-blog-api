const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createUser(username, password, isAdmin) {
  console.log(`Creating user: ${username}`);
  console.log(`Is Admin: ${isAdmin}`);
  await prisma.users.create({
    data: {
      username: username,
      password: password,
      isAdmin: isAdmin,
    },
  });
}

module.exports = {
  createUser,
};
