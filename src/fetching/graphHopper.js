export function getTravelTime(start, end, profile) {
    const endpoint = process.env.GRAPHHOPPER_API_URL;
    const api_key = process.env.GRAPHHOPPER_API_KEY;
    const body = {
        "points": [
            [
                start.longitude,
                start.latitude,
            ],
            [
                end.longitude,
                end.latitude
            ],
        ],
        "profile": profile,
        "locale": "fr",
        "instructions": false,
        "calc_points": false,
        "points_encoded": false,
    }
}