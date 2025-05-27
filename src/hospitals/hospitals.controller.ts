import { FastifyRequest, FastifyReply } from "fastify";
import { sortHospitalsByScore, paginateHospitals, filterHospitalsByEmergency, sortHospitalsByDistance } from "./hospitals.utils";
import fetchHospitalsData from "../fetching/fetching.PE";
import { LatLng } from "../fetching/fetching.ORS.model";
import { Hospital, Profile } from "./hospitals.model";

interface HospitalsQuery {
    page?: string;
    limit?: string;
}
interface EmergencyParams {
    emergency: string;
}

/**
 * Parses the profile parameter, defaults to vehiculePersonnel if invalid.
 */
function parseProfile(profileParam: unknown): Profile {
    if (profileParam && Object.values(Profile).includes(profileParam as Profile)) {
        return profileParam as Profile;
    }
    return Profile.vehiculePersonnel;
}

/**
 * Parses latitude and longitude into a LatLng object.
 */
function parsePosition(latitude: unknown, longitude: unknown): LatLng {
    const lat = latitude !== undefined ? Number(latitude) : undefined;
    const lng = longitude !== undefined ? Number(longitude) : undefined;
    if (lat !== undefined && lng !== undefined && !isNaN(lat) && !isNaN(lng)) {
        return { latitude: lat, longitude: lng };
    }
    return { latitude: 0, longitude: 0 };
}

/**
 * Returns pagination parameters from query.
 */
function getPagination(query: HospitalsQuery, total: number) {
    const page = Number(query.page) || 0;
    const limit = Number(query.limit) || total;
    return { page, limit };
}

/**
 * Handles errors and sends a response.
 */
function handleError(reply: FastifyReply, error: unknown, message = "Internal server error") {
    if (error instanceof Error) {
        reply.status(500).send({ error: message, details: error.message });
    } else {
        reply.status(500).send({ error: message });
    }
}

/**
 * Handler for GET /api/hospitals
 */
export async function getHospitalsHandler(
    request: FastifyRequest<{ Querystring: HospitalsQuery; Params: { profile?: Profile; latitude?: string; longitude?: string } }>,
    reply: FastifyReply
) {
    try {
        const profile = parseProfile(request.params.profile);
        const userPosition = parsePosition(request.params.latitude, request.params.longitude);
        const hospitalsData = await fetchHospitalsData(userPosition, profile);
        if (!hospitalsData) {
            return reply.status(500).send({ error: "Failed to fetch hospitals data" });
        }
        const { page, limit } = getPagination(request.query, hospitalsData.hospitals.length);
        let hospitals = hospitalsData.hospitals;
        if (userPosition.latitude !== 0 || userPosition.longitude !== 0) {
            hospitals = sortHospitalsByDistance(hospitals, userPosition);
        }
        if (hospitals.length > 50) {
            hospitals = hospitals.slice(0, 50);
        }
        const scoredHospitals = sortHospitalsByScore(hospitals);
        const { paginated, total } = paginateHospitals(scoredHospitals, page, limit);
        reply.send({ hospitals: paginated, page, limit, total });
    } catch (error) {
        handleError(reply, error, "Failed to process hospitals request");
    }
}

/**
 * Handler for GET /api/hospitals/:emergency
 */
export async function getHospitalsByEmergencyHandler(
    request: FastifyRequest<{ Params: EmergencyParams & { profile?: Profile; latitude?: string; longitude?: string }; Querystring: HospitalsQuery }>,
    reply: FastifyReply
) {
    try {
        const { emergency, profile: profileParam, latitude, longitude } = request.params;
        const profile = parseProfile(profileParam);
        const userPosition = parsePosition(latitude, longitude);
        const hospitalsData = await fetchHospitalsData(userPosition, profile);
        if (!hospitalsData) {
            return reply.status(500).send({ error: "Failed to fetch hospitals data" });
        }
        const { page, limit } = getPagination(request.query, hospitalsData.hospitals.length);
        let hospitals = filterHospitalsByEmergency(hospitalsData.hospitals, emergency.toLowerCase());
        if (userPosition.latitude !== 0 || userPosition.longitude !== 0) {
            hospitals = sortHospitalsByDistance(hospitals, userPosition);
        }
        if (hospitals.length > 50) {
            hospitals = hospitals.slice(0, 50);
        }
        const scoredHospitals = sortHospitalsByScore(hospitals);
        const { paginated, total } = paginateHospitals(scoredHospitals, page, limit);
        reply.send({ hospitals: paginated, page, limit, total });
    } catch (error) {
        handleError(reply, error, "Failed to process hospitals by emergency request");
    }
}

export default {}