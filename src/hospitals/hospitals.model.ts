export interface Position {
  latitude: number;
  longitude: number;
}

export enum Speciality {
  "Urgences générales Adulte", 
  "Urgences générales Enfants", 
  "Urgences ophtalmologie", 
  "Pas de spécialité"
}

export interface Hospital {
  id: number;
  name: string;
  position: Position;
  address: string;
  speciality: Speciality;
  public: boolean;
  currentWaitTime: number;
  nextWaitTime: number;
  travelTime: number;
}

export interface HospitalsData {
  hospitals: Hospital[];
}

export enum Profile {
  aPied = "foot-walking",
  vehiculePersonnel = "driving-car",
  transportCommun = "driving-hgv"
}

// Speciality filter mapping for API param to hospital speciality string
export const SPECIALITY_MAP: Record<string, string> = {
  adulte: "Urgences générales Adulte",
  enfant: "Urgences générales Enfants",
  ophtalmologie: "Urgences ophtalmologie",
  autre: "Pas de spécialité"
};

export default {}