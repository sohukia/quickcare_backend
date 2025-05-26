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

export default {}