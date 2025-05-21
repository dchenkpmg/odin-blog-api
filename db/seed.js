const { PrismaClient } = require("@prisma/client");
const { faker } = require("@faker-js/faker");

const prisma = new PrismaClient();

async function main() {
  await prisma.users.deleteMany({});
  await prisma.posts.deleteMany({});
  await prisma.comments.deleteMany({});

  const numUsers = 5;
  const numPosts = 10;
  const numComments = 20;

  const users = [];
  const posts = [];
  const comments = [];

  for (let i = 0; i < numUsers; i++) {
    const user = {
      username: faker.internet.username(),
      password: faker.internet.password(),
      isAdmin: false,
    };
    users.push(user);
  }

  for (let i = 0; i < numPosts; i++) {
    const post = {
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(3),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      authorId: faker.number.int({ min: 1, max: numUsers }),
    };
    posts.push(post);
  }

  for (let i = 0; i < numComments; i++) {
    const comment = {
      authorId: faker.number.int({ min: 1, max: numUsers }),
      postId: faker.number.int({ min: 1, max: numPosts }),
      content: faker.lorem.sentence(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
    comments.push(comment);
  }

  await prisma.users.createMany({ data: users });
  await prisma.posts.createMany({ data: posts });
  await prisma.comments.createMany({ data: comments });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
