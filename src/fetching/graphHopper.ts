export interface LatLng {
    latitude: number;
    longitude: number;
}

export async function getTravelTime(
    start: LatLng,
    end: LatLng,
    profile: string
): Promise<number | undefined> {
    const endpoint = process.env.GRAPHHOPPER_API_URL;
    const api_key = process.env.GRAPHHOPPER_API_KEY;
    const body = {
        points: [
            [start.longitude, start.latitude],
            [end.longitude, end.latitude],
        ],
        profile,
        locale: "fr",
        instructions: false,
        calc_points: false,
        points_encoded: false,
    };
    // Example fetch logic (uncomment and adapt as needed)
    // const response = await fetch(`${endpoint}?key=${api_key}`, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(body),
    // });
    // const data = await response.json();
    // return data.paths?.[0]?.time;
    return undefined;
}
