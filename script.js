import { prisma } from "./lib/prisma.js";

async function main() {
  await prisma.user.createMany({
    data: [
      { email: "alice@example.com", name: "Alice" },
      { email: "bob@example.com", name: "Bob" },
      { email: "charlie@example.com", name: "Charlie" },
      { email: "diana@example.com", name: "Diana" },
      { email: "eve@example.com", name: "Eve" },
      { email: "frank@example.com", name: "Frank" },
      { email: "grace@example.com", name: "Grace" },
      { email: "henry@example.com", name: "Henry" },
      { email: "isabella@example.com", name: "Isabella" },
      { email: "jack@example.com", name: "Jack" },
    ],
    skipDuplicates: true, // prevents errors if you run the seed multiple times
  });

  console.log("Seed data inserted!");
  const allUsers = await prisma.user.findMany({
    include: {
      posts: true,
    },
  });
  console.log("All users:", JSON.stringify(allUsers, null, 2));
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
