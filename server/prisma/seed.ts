import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

// Define the order of deletion (reverse order of dependencies)
const deletionOrder = [
  // Tables with dependencies (delete first)
  "expenseByCategory.json",
  "expenseSummary.json",
  "sales.json",
  "salesSummary.json",
  "purchases.json",
  "purchaseSummary.json",
  "expenses.json",
  // Tables without dependencies (delete last)
  "products.json",
  "users.json",
];

// Define the order of seeding (forward order of dependencies)
const seedingOrder = [
  // Tables without dependencies (seed first)
  "products.json",
  "users.json",
  // Tables with dependencies (seed after their referenced tables)
  "expenses.json",
  "expenseSummary.json",
  "expenseByCategory.json",
  "sales.json",
  "salesSummary.json",
  "purchases.json",
  "purchaseSummary.json",
];

async function deleteAllData(fileNames: string[]) {
  const modelNames = fileNames.map((fileName) => {
    const modelName = path.basename(fileName, path.extname(fileName));
    return modelName.charAt(0).toUpperCase() + modelName.slice(1);
  });

  for (const modelName of modelNames) {
    const model: any = prisma[modelName as keyof typeof prisma];
    if (model) {
      await model.deleteMany({});
      console.log(`Cleared data from ${modelName}`);
    } else {
      console.error(
        `Model ${modelName} not found. Please ensure the model name is correctly specified.`
      );
    }
  }
}

async function seedData(fileNames: string[]) {
  const dataDirectory = path.join(__dirname, "seedData");

  for (const fileName of fileNames) {
    const filePath = path.join(dataDirectory, fileName);
    const jsonData = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    const modelName = path.basename(fileName, path.extname(fileName));
    const model: any = prisma[modelName as keyof typeof prisma];

    if (!model) {
      console.error(`No Prisma model matches the file name: ${fileName}`);
      continue;
    }

    for (const data of jsonData) {
      await model.create({
        data,
      });
    }

    console.log(`Seeded ${modelName} with data from ${fileName}`);
  }
}

async function main() {
  // Clear data in the correct order
  await deleteAllData(deletionOrder);

  // Seed data in the correct order
  await seedData(seedingOrder);
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
