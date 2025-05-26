import { LatLng } from "./fetching.ORS.model";
import { Profile } from "../hospitals/hospitals.model";

export async function fetchTravelTimes(
    start: LatLng,
    destinations: LatLng[],
    profile: Profile
): Promise<Array<number> | undefined> {
    const endpoint = process.env.OPENROUTESERVICE_API_URL || "https://api.openrouteservice.org/v2/matrix";
    const api_key = process.env.OPENROUTESERVICE_API_KEY;
    const locations = [start, ...destinations].map(pos => [pos.longitude, pos.latitude]);
    const body = {
        "locations": locations,
        "sources": [0]
    };
    const response = await fetch(`${endpoint}/${profile}`, {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "*/*",
            "Accept-Encoding": "gzip, deflate, br",
            "Connection": "keep-alive",
            "Authorization": `${api_key}`,
        },
        body: JSON.stringify(body),
    });
    const data = await response.json();
    if (!response.ok || !data || !data.durations || data.durations.length === 0) {
        console.error("Error fetching travel times:", data);
        return undefined;
    }
    return data.durations[0].slice(1);
}
