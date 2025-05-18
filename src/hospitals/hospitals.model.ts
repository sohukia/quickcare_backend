// ...existing code or add model definitions here...
export interface Position {
  latitude: number;
  longitude: number;
}

export interface Hospital {
  id: number;
  name: string;
  position: Position;
  address: string;
  specialties: string[];
  public: boolean;
  currentWaitTime: number;
  travelTime: number;
}

export interface HospitalsData {
  hospitals: Hospital[];
}

export default {}