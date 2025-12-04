import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { env } from "./env.js";
import { PrismaClient } from "./generated/prisma/client.js";

const adapter = new PrismaMariaDb(env.DATABASE_URL);

declare global {
	var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
	globalThis.__prisma = prisma;
}
