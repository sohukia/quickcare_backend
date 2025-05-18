import { Hospital } from "./hospitals.model";

function computeHospitalScore(
    waitingTime: number,
    travelTime: number,
    isPublic: boolean,
    specialities: string[]
): number {
    return 1 / (waitingTime + travelTime) * (1 + (isPublic ? 1 : 0)) + (0.05 * specialities.length);
}

export function sortHospitalsByScore(hospitals: Hospital[]): (Hospital & { score: number })[] {
    const hospitalsWithScore = hospitals.map((hospital) => {
        const score = computeHospitalScore(
            hospital.currentWaitTime,
            hospital.travelTime,
            hospital.public,
            hospital.specialties
        );
        return { ...hospital, score };
    });
    hospitalsWithScore.sort((a, b) => b.score - a.score);
    return hospitalsWithScore;
}

export function paginateHospitals<T>(hospitals: T[], page: number, limit: number): { paginated: T[]; total: number } {
    const start = page * limit;
    const end = start + limit;
    return {
        paginated: hospitals.slice(start, end),
        total: hospitals.length
    };
}

export function filterHospitalsByEmergency(hospitals: Hospital[], emergencyType: string): Hospital[] {
    if (emergencyType === 'general') {
        return hospitals;
    }
    return hospitals.filter(hospital =>
        hospital.specialties.map(s => s.toLowerCase()).includes(emergencyType)
    );
}

// ...existing code or add service logic here...
export default {}