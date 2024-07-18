import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../database";
import { randomUUID } from "crypto";
import { checkSessionIdExists } from "../middlewares/check-sessionid-exists";

export async function transactionsRoutes(app: FastifyInstance) {
  app.get(
    "/",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const transactions = await prisma.transactions.findMany({
        where: {
          session_id: sessionId,
        },
      });
      return { transactions };
    },
  );

  app.get(
    "/:id",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const getTransactionParamsSchema = z.object({
        id: z.string().uuid(),
      });

      const { id } = getTransactionParamsSchema.parse(request.params);

      const { sessionId } = request.cookies;

      const transaction = await prisma.transactions.findUnique({
        where: {
          id,
          session_id: sessionId,
        },
      });

      return { transaction };
    },
  );

  app.get(
    "/summary",
    {
      preHandler: [checkSessionIdExists],
    },
    async (request) => {
      const { sessionId } = request.cookies;

      const summary = await prisma.transactions.aggregate({
        where: {
          session_id: sessionId,
        },
        _sum: {
          amount: true,
        },
      });
      return { Summary: { amount: summary._sum.amount } };
    },
  );

  app.post("/", async (request, reply) => {
    const createTransactionBodySchema = z.object({
      title: z.string(),
      amount: z.number(),
      type: z.enum(["credit", "debit"]),
    });

    const { title, amount, type } = createTransactionBodySchema.parse(
      request.body,
    );

    let sessionId = request.cookies.sessionId;

    if (!sessionId) {
      sessionId = randomUUID();

      reply.cookie("sessionId", sessionId, {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
    }

    await prisma.transactions.create({
      data: {
        id: randomUUID(),
        title,
        amount: type === "credit" ? amount : amount * -1,
        session_id: sessionId,
      },
    });

    return reply.status(201).send();
  });
}
