const { PrismaClient } = require('@prisma/client');

let prisma;

if (process.env.NODE_ENV !== 'production') {
  // Only create a new PrismaClient instance in development or non-production environments
  prisma = new PrismaClient();
} else {
  // In production, consider connection pooling or a global singleton (if appropriate)
  // for efficiency. Consult Prisma documentation for guidance.
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma

