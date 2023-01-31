const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany(); 

  const user1 = await prisma.user.create({
    data: {
      email: "user1@mail.com",
      password: "12345"
    }
  });

  const post1 = await prisma.post.create({
    data: {
      text: "Mollit ad laboris consectetur labore proident esse eu.",
      owner: {
        connect: {
          id: user1.id,
        }
      },
    },
    include: {
      owner: true,
    }
  });

  console.log(user1);
  console.log(post1);
};

main();