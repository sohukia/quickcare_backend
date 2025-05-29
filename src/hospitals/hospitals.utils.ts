// Utility functions for hospitals module
// src/hospitals/hospitals.utils.ts

import { Hospital } from "./hospitals.model.js";

/**
 * Computes the Haversine distance (in meters) between two positions.
 */
export function computeDistance(
    pos1: { latitude: number; longitude: number },
    pos2: { latitude: number; longitude: number }
): number {
    const R = 6371e3; // metres
    const phi1 = pos1.latitude * Math.PI / 180;
    const phi2 = pos2.latitude * Math.PI / 180;
    const delta_phi = (pos2.latitude - pos1.latitude) * Math.PI / 180;
    const delta_lambda = (pos2.longitude - pos1.longitude) * Math.PI / 180;

    const a = Math.sin(delta_phi / 2) * Math.sin(delta_phi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(delta_lambda / 2) * Math.sin(delta_lambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
}

/**
 * Sorts hospitals by distance from a reference position.
 */
export function sortHospitalsByDistance<T extends { position: { latitude: number; longitude: number } }>(
    hospitals: T[],
    referencePosition: { latitude: number; longitude: number }
): T[] {
    return hospitals.slice().sort((a, b) => {
        const distanceA = computeDistance(a.position, referencePosition);
        const distanceB = computeDistance(b.position, referencePosition);
        return distanceA - distanceB;
    });
}

/**
 * Computes a score for a hospital based on wait time, travel time, and public status.
 */
function computeHospitalScore(
    waitingTime: number,
    travelTime: number,
): number {
    return 1 / (waitingTime + travelTime);
}

/**
 * Sorts hospitals by computed score (descending).
 */
export function sortHospitalsByScore(hospitals: Hospital[]): (Hospital & { score: number })[] {
    const hospitalsWithScore = hospitals.map((hospital) => {
        const score = computeHospitalScore(
            hospital.currentWaitTime,
            hospital.travelTime
        );
        return { ...hospital, score };
    });
    hospitalsWithScore.sort((a, b) => b.score - a.score);
    return hospitalsWithScore;
}

/**
 * Returns a paginated slice of hospitals.
 */
export function paginateHospitals<T>(hospitals: T[], page: number, limit: number): { paginated: T[]; total: number } {
    const start = page * limit;
    const end = start + limit;
    return {
        paginated: hospitals.slice(start, end),
        total: hospitals.length
    };
}

// filterHospitalsByEmergency has been removed in favor of filterHospitalsBySpeciality in the controller. All filtering by emergency/speciality is now handled in the controller only.

export default {}