import express from 'express';
import hospitalsData from '../data/hospitalsData.js';
import { sortHospitalsByScore, paginateHospitals, filterHospitalsByEmergency } from '../utils/hospitals.js';

const router = express.Router();

// GET /api.hospitals - Get all hospitals sorted by score, paginated
router.get('/', (req, res) => {
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || hospitalsData.hospitals.length;
    const sortedHospitals = sortHospitalsByScore(hospitalsData.hospitals);
    const { paginated, total } = paginateHospitals(sortedHospitals, page, limit);

    res.json({
        hospitals: paginated,
        page,
        limit: limit,
        total
    });
});

// GET /api/hospitals/:emergency - Get hospitals for a specific emergency, paginated
router.get('/:emergency', (req, res) => {
    const emergencyType = req.params.emergency.toLowerCase();
    const page = parseInt(req.query.page, 10) || 0;
    const limit = parseInt(req.query.limit, 10) || hospitalsData.hospitals.length;
    const filteredHospitals = filterHospitalsByEmergency(hospitalsData.hospitals, emergencyType);
    const sortedHospitals = sortHospitalsByScore(filteredHospitals);
    const { paginated, total } = paginateHospitals(sortedHospitals, page, limit);

    res.json({
        hospitals: paginated,
        page,
        limit: limit,
        total
    });
});

router.post('/search', (req, res) => {
    const { query } = req.body;
    const filteredHospitals = hospitalsData.hospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(query.toLowerCase())
    );
    const sortedFilteredHospitals = sortHospitalsByScore(filteredHospitals);
    res.json(sortedFilteredHospitals);
});

export default router;
