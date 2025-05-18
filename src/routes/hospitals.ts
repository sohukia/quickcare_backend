import { FastifyInstance, FastifyPluginOptions } from "fastify";
import hospitalsData, { Hospital } from "../data/hospitalsData.js";
import { sortHospitalsByScore, paginateHospitals, filterHospitalsByEmergency } from "../utils/hospitals.js";

async function hospitalsRoutes(fastify: FastifyInstance, _opts: FastifyPluginOptions) {
  // GET /api/hospitals
  fastify.get("/", async (request, reply) => {
    const page = Number((request.query as any).page) || 0;
    const limit = Number((request.query as any).limit) || hospitalsData.hospitals.length;
    const sortedHospitals = sortHospitalsByScore(hospitalsData.hospitals);
    const { paginated, total } = paginateHospitals(sortedHospitals, page, limit);
    reply.send({ hospitals: paginated, page, limit, total });
  });

  // GET /api/hospitals/:emergency
  fastify.get("/:emergency", async (request, reply) => {
    const { emergency } = request.params as { emergency: string };
    const page = Number((request.query as any).page) || 0;
    const limit = Number((request.query as any).limit) || hospitalsData.hospitals.length;
    const filteredHospitals = filterHospitalsByEmergency(hospitalsData.hospitals, emergency.toLowerCase());
    const sortedHospitals = sortHospitalsByScore(filteredHospitals);
    const { paginated, total } = paginateHospitals(sortedHospitals, page, limit);
    reply.send({ hospitals: paginated, page, limit, total });
  });

  // POST /api/hospitals/search
  fastify.post("/search", async (request, reply) => {
    const { query } = request.body as { query: string };
    const filteredHospitals = hospitalsData.hospitals.filter((hospital) =>
      hospital.name.toLowerCase().includes(query.toLowerCase())
    );
    const sortedFilteredHospitals = sortHospitalsByScore(filteredHospitals);
    reply.send(sortedFilteredHospitals);
  });
}

export default hospitalsRoutes;
