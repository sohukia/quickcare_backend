import { FastifyRequest, FastifyReply } from "fastify";
import hospitalsData from "./hospitals.data";
import { sortHospitalsByScore, paginateHospitals, filterHospitalsByEmergency } from "./hospitals.service";

// Define query and body types
interface HospitalsQuery {
    page?: string;
    limit?: string;
}
interface EmergencyParams {
    emergency: string;
}
interface SearchBody {
    query: string;
}

export async function getHospitalsHandler(
    request: FastifyRequest<{ Querystring: HospitalsQuery }>,
    reply: FastifyReply
) {
    const page = Number(request.query.page) || 0;
    const limit = Number(request.query.limit) || hospitalsData.hospitals.length;
    const sortedHospitals = sortHospitalsByScore(hospitalsData.hospitals);
    const { paginated, total } = paginateHospitals(sortedHospitals, page, limit);
    reply.send({ hospitals: paginated, page, limit, total });
}

export async function getHospitalsByEmergencyHandler(
    request: FastifyRequest<{ Params: EmergencyParams; Querystring: HospitalsQuery }>,
    reply: FastifyReply
) {
    const { emergency } = request.params;
    const page = Number(request.query.page) || 0;
    const limit = Number(request.query.limit) || hospitalsData.hospitals.length;
    const filteredHospitals = filterHospitalsByEmergency(hospitalsData.hospitals, emergency.toLowerCase());
    const sortedHospitals = sortHospitalsByScore(filteredHospitals);
    const { paginated, total } = paginateHospitals(sortedHospitals, page, limit);
    reply.send({ hospitals: paginated, page, limit, total });
}

export async function searchHospitalsHandler(
    request: FastifyRequest<{ Body: SearchBody }>,
    reply: FastifyReply
) {
    const { query } = request.body;
    const filteredHospitals = hospitalsData.hospitals.filter((hospital) =>
        hospital.name.toLowerCase().includes(query.toLowerCase())
    );
    const sortedFilteredHospitals = sortHospitalsByScore(filteredHospitals);
    reply.send(sortedFilteredHospitals);
}

export default {}