import { FastifyInstance } from "fastify";
import {
    getHospitalsHandler,
    getHospitalsByEmergencyHandler,
    searchHospitalsHandler
} from "./hospitals.controller";

async function hospitalsRoutes(fastify: FastifyInstance) {
    // GET /api/hospitals
    fastify.get("/", getHospitalsHandler);

    // GET /api/hospitals/:emergency
    fastify.get("/:emergency", getHospitalsByEmergencyHandler);

    // POST /api/hospitals/search
    fastify.post("/search", searchHospitalsHandler);
}

export { hospitalsRoutes as default, hospitalsRoutes };
