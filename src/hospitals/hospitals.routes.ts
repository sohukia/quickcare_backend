import { FastifyInstance } from "fastify";
import {
    getHospitalsHandler,
    getHospitalsByEmergencyHandler,
} from "./hospitals.controller";

async function hospitalsRoutes(fastify: FastifyInstance) {
    // GET /api/hospitals
    fastify.get("/", getHospitalsHandler);

    // GET /api/hospitals/:emergency
    fastify.get("/:emergency", getHospitalsByEmergencyHandler);
}

export { hospitalsRoutes as default, hospitalsRoutes };
