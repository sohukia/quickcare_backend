import Fastify from "fastify";
import cors from "@fastify/cors";
import {hospitalsRoutes} from "./hospitals";
import "./common/config"


const fastify = Fastify({ logger: true });

await fastify.register(cors);

fastify.register(hospitalsRoutes, { prefix: "/api/hospitals" });

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  fastify.log.info(`Server listening at ${address}`);
});
