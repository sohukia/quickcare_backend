// Example usage for formatting travel time from ms to h/m/s

export function formatTravelTime(travelTimeMs: number): string {
    const hours = Math.floor(travelTimeMs / 3600000);
    const minutes = Math.floor((travelTimeMs % 3600000) / 60000);
    const seconds = Math.floor((travelTimeMs % 60000) / 1000);
    return `${hours}h ${minutes}m ${seconds}s`;
}

// Example usage:
// const formatted = formatTravelTime(376609);
// console.log("Total Travel Duration:", formatted);