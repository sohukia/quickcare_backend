import { sortHospitalsByScore, paginateHospitals, filterHospitalsByEmergency } from "../../src/hospitals/hospitals.service";
import hospitalsData from "../../src/hospitals/hospitals.data";
import { Hospital } from "../../src/hospitals/hospitals.model";

describe("hospitals.service", () => {
    const hospitals: Hospital[] = hospitalsData.hospitals;
    
    test("sortHospitalsByScore returns hospitals sorted by score descending", () => {
        const sorted = sortHospitalsByScore(hospitals);
        expect(sorted.length).toBe(hospitals.length);
        for (let i = 1; i < sorted.length; i++) {
            expect(sorted[i - 1].score).toBeGreaterThanOrEqual(sorted[i].score);
        }
    });
    
    test("paginateHospitals paginates correctly", () => {
        const page = 1;
        const limit = 5;
        const { paginated, total } = paginateHospitals(hospitals, page, limit);
        expect(paginated.length).toBe(limit);
        expect(total).toBe(hospitals.length);
        expect(paginated[0]).toEqual(hospitals[page * limit]);
    });
    
    test("filterHospitalsByEmergency returns all for 'general'", () => {
        const filtered = filterHospitalsByEmergency(hospitals, "general");
        expect(filtered.length).toBe(hospitals.length);
    });
    
    test("filterHospitalsByEmergency filters by specialty", () => {
        const filtered = filterHospitalsByEmergency(hospitals, "cardiology");
        expect(filtered.every(h => h.specialties.map(s => s.toLowerCase()).includes("cardiology"))).toBe(true);
    });
    
    test("filterHospitalsByEmergency returns empty if no match", () => {
        const filtered = filterHospitalsByEmergency(hospitals, "nonexistent-specialty");
        expect(filtered.length).toBe(0);
    });
});
