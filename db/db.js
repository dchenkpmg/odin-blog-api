async function createUser(username, password, isAdmin) {
  console.log(`Creating user: ${username}`);
  await prisma.user.create({
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
