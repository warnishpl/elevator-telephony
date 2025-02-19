export interface Elevator {
  uuid: string;
  address: string;
  city: string;
  phoneNumber: string;
  region: {
    name: string;
    uuid: string;
  };
  status: string | null;
  updatedAt: string;
  gsmModule?: string;
}
export type AllowedElevatorEditData = Partial<Pick<
  Elevator,
  "address" | "city" | "phoneNumber"
> & {regionUuid: string}>;
