export interface CoordState {
  coord: Coordinate | null;
}

export interface Coordinate {
  lat: number;
  lng: number;
}

export interface SetCoordAction {
  type: "SET_COORD";
  payload: Coordinate;
}

export type CoordAction = SetCoordAction;
