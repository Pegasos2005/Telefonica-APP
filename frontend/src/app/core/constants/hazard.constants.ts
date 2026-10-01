import { HazardType, LatLng } from '../models/zone.model';

export const HAZARD_TYPES: HazardType[] = ['Incendio', 'Tsunami', 'Inundación', 'Otro'];

export const HAZARD_COLORS: Record<HazardType, string> = {
  Incendio: '#dc2626',
  Tsunami: '#2563eb',
  Inundación: '#0891b2',
  Otro: '#d97706',
};

/** Las Palmas de Gran Canaria, por si no hay GPS */
export const DEFAULT_POSITION: LatLng = { lat: 28.1235, lng: -15.4363 };
