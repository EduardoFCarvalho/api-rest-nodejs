import { app } from "./app";
require("dotenv/config");

const port = process.env.ENV_PORT ? parseInt(process.env.ENV_PORT) : 3000; // Assuming default port is 3000

app
  .listen({
    port,
  })
  .then(() => {
    console.log("HTTP server running!");
  });
