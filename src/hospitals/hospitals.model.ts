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
  specialty: Speciality;
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

// Specialty filter mapping for API param to hospital specialty string
export const SPECIALTY_MAP: Record<string, string> = {
  adulte: "Urgences générales Adulte",
  enfant: "Urgences générales Enfants",
  ophtalmologie: "Urgences ophtalmologie",
  autre: "Pas de spécialité"
};

// Removed deprecated code and legacy exports. All specialty filtering is now handled via the 'specialty' param and SPECIALTY_MAP.

export default {}