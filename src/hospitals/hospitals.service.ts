import { Hospital, HospitalsData, Position } from "./hospitals.model";

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

export async function listHostpitals(): Promise<HospitalsData> {
    const data = await fetch(String(process.env.PREDICTIF_EMERGENCY_DEPTS));
    const json = await data.json();
    let hospitals: HospitalsData = {
        hospitals: [],
    };

    for (let hp of json.objects) {
        let pos: Position = {
            latitude: hp.latitude,
            longitude: hp.longitude
        };

        let hospital: Hospital = {
            id: hp.id,
            name: hp.name,
            position: pos,
            address: hp.address,
            specialties: [hp.speciality],
            public: Boolean(hp.type),
            currentWaitTime: 0,
            nextWaitTime: 0,
            travelTime: 0,
        };

        hospitals.hospitals.push(hospital);
    }
    return hospitals;
}

export async function getHostpitalsTime(hpList: HospitalsData, hpIds: Array<number>): Promise<HospitalsData> {
    let ids = [];
    for (let i of hpIds) {
        let hp = hpList.hospitals[i];
        ids.push(hp.id);
    }

    let f = await fetch(String(process.env.PREDICTIF_EMERGENCY_INFLUXES) + ids.toString());
    let data = await f.json();

    for (let i = 0; i < ids.length; i++) {
        let index = hpIds[i];
        let fetchedData = data.objects[i];

        hpList.hospitals[index].currentWaitTime = fetchedData.estimated[2];
        hpList.hospitals[index].nextWaitTime = fetchedData.estimated[3];
    }

    return hpList;
}

// ...existing code or add service logic here...
export default {}