export function getTravelTime(
  start: { latitude: number; longitude: number },
  end: { latitude: number; longitude: number },
  profile: string
) {
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
  // ...implement fetch logic as needed...
}
