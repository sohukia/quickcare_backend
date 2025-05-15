function computeHospitalScore(waitingTime, travelTime, isPublic, specialities) {
    return 1 / (waitingTime + travelTime) * (1 + (isPublic ? 1 : 0)) + (0.05 * specialities.length);
}

export function sortHospitalsByScore(hospitals) {
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

export function paginateHospitals(hospitals, page, limit) {
    const start = page * limit;
    const end = start + limit;
    return {
        paginated: hospitals.slice(start, end),
        total: hospitals.length
    };
}

export function filterHospitalsByEmergency(hospitals, emergencyType) {
    if (emergencyType === 'general') {
        return hospitals;
    }
    return hospitals.filter(hospital =>
        hospital.specialties.map(s => s.toLowerCase()).includes(emergencyType)
    );
}