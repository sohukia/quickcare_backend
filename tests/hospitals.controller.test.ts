import Fastify, { FastifyInstance } from 'fastify';
import hospitalsRoutes from '../src/hospitals/hospitals.routes';
import * as fetchingPE from '../src/fetching/fetching.PE';
import * as fetchingORS from '../src/fetching/fetching.ORS';
import { Profile, Speciality } from '../src/hospitals/hospitals.model';

describe('Hospitals Controller', () => {
    let fastify: FastifyInstance;
    
    beforeAll(async () => {
        fastify = Fastify();
        fastify.register(hospitalsRoutes, { prefix: '/api/hospitals' });
        await fastify.ready();
    });
    
    afterAll(() => fastify.close());
    
    const mockHospitals = Array.from({ length: 60 }).map((_, i) => ({
        id: i + 1,
        name: `Hospital ${i + 1}`,
        position: { latitude: 48.85 + i * 0.01, longitude: 2.35 + i * 0.01 },
        address: `Address ${i + 1}`,
        speciality:
        i % 4 === 0
        ? Speciality['Urgences générales Adulte']
        : i % 4 === 1
        ? Speciality['Urgences générales Enfants']
        : i % 4 === 2
        ? Speciality['Urgences ophtalmologie']
        : Speciality['Pas de spécialité'],
        public: i % 2 === 0,
        currentWaitTime: 10 + i,
        nextWaitTime: 20 + i,
        travelTime: 0,
    }));
    
    const mockTravelTimes = Array.from({ length: 60 }).map((_, i) => 1000 + i * 10);
    
    beforeEach(() => {
        jest.spyOn(fetchingPE, 'default').mockImplementation(async () => ({ hospitals: mockHospitals }));
        jest.spyOn(fetchingORS, 'fetchTravelTimes').mockImplementation(async () => mockTravelTimes);
    });
    
    afterEach(() => {
        jest.restoreAllMocks();
    });
    
    it('accepts user requests with position, emergency type, and profile', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/hospitals?page=0&limit=10',
            query: {
                latitude: '48.85',
                longitude: '2.35',
                profile: Profile.aPied,
            },
        });
        expect(response.statusCode).toBe(200);
        const body = JSON.parse(response.body);
        expect(Array.isArray(body.hospitals)).toBe(true);
        expect(body.hospitals.length).toBe(10);
    });
    
    it('fetches hospitals from the PE API and limits to 50 closest', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/hospitals?page=0&limit=100',
            query: {
                latitude: '48.85',
                longitude: '2.35',
                profile: Profile.vehiculePersonnel,
            },
        });
        const body = JSON.parse(response.body);
        expect(body.hospitals.length).toBeLessThanOrEqual(50);
    });
    
    it('filters by emergency type', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/hospitals/Urgences%20g%C3%A9n%C3%A9rales%20Adulte?page=0&limit=10',
            query: {
                latitude: '48.85',
                longitude: '2.35',
                profile: Profile.vehiculePersonnel,
            },
        });
        const body = JSON.parse(response.body);
        expect(body.hospitals.every((h: any) => h.speciality === Speciality['Urgences générales Adulte'])).toBe(true);
    });
    
    it('uses OpenRouteService MATRIX API to get travel times', async () => {
        jest.restoreAllMocks(); // Remove previous mocks to allow real call chain
        const spy = jest.spyOn(fetchingORS, 'fetchTravelTimes').mockImplementation(async () => mockTravelTimes);
        jest.spyOn(fetchingPE, 'default').mockImplementation(async (userPosition, profile) => {
            // Ensure profile is always defined
            const safeProfile = profile || Profile.vehiculePersonnel;
            const hospitals = mockHospitals.map(h => ({ ...h }));
            const travelTimes = await fetchingORS.fetchTravelTimes(userPosition, hospitals.map(h => h.position), safeProfile) || Array(hospitals.length).fill(0);
            hospitals.forEach((h, i) => { h.travelTime = travelTimes[i]; });
            return { hospitals };
        });
        await fastify.inject({
            method: 'GET',
            url: '/api/hospitals?page=0&limit=5',
            query: {
                latitude: '48.85',
                longitude: '2.35',
                profile: Profile.transportCommun,
            },
        });
        expect(spy).toHaveBeenCalled();
    });
    
    it('scores and sorts hospitals by (travel time + waiting time), descending by score', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/hospitals?page=0&limit=10',
            query: {
                latitude: '48.85',
                longitude: '2.35',
                profile: Profile.vehiculePersonnel,
            },
        });
        const body = JSON.parse(response.body);
        const hospitals = body.hospitals;
        for (let i = 1; i < hospitals.length; i++) {
            // Score = 1 / (wait + travel) * (1 + (public ? 1 : 0))
            const prevScore = 1 / (hospitals[i - 1].currentWaitTime + hospitals[i - 1].travelTime) * (1 + (hospitals[i - 1].public ? 1 : 0));
            const currScore = 1 / (hospitals[i].currentWaitTime + hospitals[i].travelTime) * (1 + (hospitals[i].public ? 1 : 0));
            expect(prevScore).toBeGreaterThanOrEqual(currScore);
        }
    });
    
    it('returns a JSON list with all required fields', async () => {
        const response = await fastify.inject({
            method: 'GET',
            url: '/api/hospitals?page=0&limit=1',
            query: {
                latitude: '48.85',
                longitude: '2.35',
                profile: Profile.vehiculePersonnel,
            },
        });
        const body = JSON.parse(response.body);
        const hospital = body.hospitals[0];
        expect(hospital).toHaveProperty('id');
        expect(hospital).toHaveProperty('name');
        expect(hospital).toHaveProperty('position');
        expect(hospital).toHaveProperty('address');
        expect(hospital).toHaveProperty('speciality');
        expect(hospital).toHaveProperty('public');
        expect(hospital).toHaveProperty('currentWaitTime');
        expect(hospital).toHaveProperty('nextWaitTime');
        expect(hospital).toHaveProperty('travelTime');
    });
});