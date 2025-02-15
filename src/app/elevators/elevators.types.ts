export type ElevatorList = Array<{
  uuid: string;
  address: string;
  city: string;
  phoneNumber: string;
  region: string;
  status: string;
  updatedAt: string;
}>;

export interface Elevator {
  uuid: string;
  address: string;
  city: string;
  phoneNumber: string;
  region: string;
  status: string | null;
  updatedAt: string;
  gsmModule?: string;
}
export interface AllowedElevatorEditData {
  address: string;
  city: string;
  phoneNumber: string;
}
