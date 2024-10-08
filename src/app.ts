import fastify from "fastify";
import cookie from "@fastify/cookie";
import { transactionsRoutes } from "./routes/transactions";

// import crypto from 'node:crypto'

export const app = fastify();

app.register(cookie);

app.register(transactionsRoutes, {
  prefix: "transactions",
});
