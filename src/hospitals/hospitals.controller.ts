import { FastifyRequest, FastifyReply } from "fastify";
import { sortHospitalsByScore, paginateHospitals, sortHospitalsByDistance } from "./hospitals.utils";
import fetchHospitalsData from "../fetching/fetching.PE";
import { LatLng } from "../fetching/fetching.ORS.model";
import { Profile, SPECIALITY_MAP } from "./hospitals.model";

interface HospitalsQuery {
    page?: string;
    limit?: string;
}

/**
 * Parses the profile parameter, defaults to vehiculePersonnel if invalid.
 */
function parseProfile(profileParam: unknown): Profile {
    if (!profileParam) return Profile.vehiculePersonnel;
    // Accept both enum key (e.g. 'aPied') and value (e.g. 'foot-walking')
    if (Object.keys(Profile).includes(profileParam as string)) {
        return Profile[profileParam as keyof typeof Profile];
    }
    if (Object.values(Profile).includes(profileParam as Profile)) {
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
 * Filters hospitals by mapped speciality param.
 * specialityParam: 'adulte' | 'enfant' | 'ophtalmologie' | 'autre'
 */
function filterHospitalsBySpeciality(hospitals: any[], specialityParam?: string): any[] {
    if (!specialityParam || specialityParam === "autre") {
        return hospitals;
    }
    const specialityString = SPECIALITY_MAP[specialityParam];
    if (!specialityString) return hospitals;
    return hospitals.filter((hospital: any) => hospital.speciality === specialityString);
}

/**
 * Handler for GET /api/hospitals
 */
export default async function getHospitalsHandler(
    request: FastifyRequest<{ Querystring: HospitalsQuery & { speciality?: string; profile?: string; latitude?: string; longitude?: string } }>,
    reply: FastifyReply
) {
    try {
        const profile = parseProfile((request.query as any).profile);
        const userPosition = parsePosition((request.query as any).latitude, (request.query as any).longitude);
        const hospitalsData = await fetchHospitalsData(userPosition, profile);
        if (!hospitalsData) {
            return reply.status(500).send({ error: "Failed to fetch hospitals data" });
        }
        const { page, limit } = getPagination(request.query, hospitalsData.hospitals.length);
        let hospitals = hospitalsData.hospitals;
        // Filter by mapped speciality param if provided
        if ((request.query as any).speciality) {
            hospitals = filterHospitalsBySpeciality(hospitals, (request.query as any).speciality);
        }
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