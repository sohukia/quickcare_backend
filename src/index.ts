import Fastify, { FastifyInstance } from "fastify";
import cors from "@fastify/cors";
import { hospitalsRoutes } from "./hospitals/hospitals.routes.js";
import dotenv from 'dotenv';

dotenv.config();

/**
 * Create and configure the Fastify server instance.
 */
function buildServer(): FastifyInstance {
  const server = Fastify({ logger: true });
  return server;
}

/**
 * Register plugins and routes.
 */
async function registerPluginsAndRoutes(server: FastifyInstance) {
  await server.register(cors);
  server.register(hospitalsRoutes, { prefix: "/api/hospitals" });
}

/**
 * Start the Fastify server.
 */
async function startServer() {
  const server = buildServer();
  await registerPluginsAndRoutes(server);

  const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;
  const HOST = "0.0.0.0";

  try {
    await server.listen({ port: PORT, host: HOST });
    server.log.info(`Server listening at http://${HOST}:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

// Entry point
startServer();
