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
export type AllowedElevatorEditData = Pick<
  Elevator,
  "address" | "city" | "phoneNumber"
>;
