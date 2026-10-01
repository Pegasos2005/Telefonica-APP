export type HazardType = 'Incendio' | 'Tsunami' | 'Inundación' | 'Otro';

export interface LatLng {
  lat: number;
  lng: number;
}

export interface DangerZone extends LatLng {
  id: number;
  type: HazardType;
  radius: number; // metros
  desc: string;
  time: number;
}

/** Lo que rellena el admin en el formulario */
export interface ZoneFormValue {
  type: HazardType;
  radius: number;
  desc: string;
}

export type NewZone = ZoneFormValue & LatLng;

export interface ZoneAlert {
  zone: DangerZone;
  distance: number; // metros al epicentro
}
