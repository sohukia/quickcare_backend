import { FastifyInstance } from "fastify";
import getHospitalsHandler from "./hospitals.controller";

async function hospitalsRoutes(fastify: FastifyInstance) {
    // GET /api/hospitals
    fastify.get("/", getHospitalsHandler);
}

export { hospitalsRoutes as default, hospitalsRoutes };
