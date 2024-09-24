export type Port = 
  | "Cape Town Harbour"
  | "Saldanha Harbour"
  | "Durban Harbour"
  | "Richardsbay Harbour"
  | "Mosselbay Harbour"
  | "East London Harbour"
  | "Port Elizabeth Harbour";

export type CatchType = 
  | "Angelfish"
  | "BlackTail"
  | "Cape Dory"
  | "Cape Salmon"
  | "Crab"
  | "Hake"
  | "Horse Mackerel"
  | "KingFish"
  | "Longfin Tuna"
  | "Red gurnard"
  | "Rock Cod"
  | "Snoek"
  | "Yellow Tail"
  | "Yellowfin Tuna";

export type Country = "South Africa" | "UK" | "USA" | "Australia" | string;

export type PermitType = 
  | "Catch IR Nearshore"
  | "Catch IR Offshore"
  | "Vessel licence"
  | "Transport"
  | "Export live"
  | "Export Frozen";

export interface NewLogSection {
  port: Port;
  logDate: Date | null;
  catchType: CatchType;
  quantity: number;
  weight: number;
  country: Country;
}

export interface PermitDetailsSection {
  skipperName: string;
  permitHolder: string;
  idNumber: string;
  permitType: PermitType;
  permitDate: Date | null;
  vesselName: string;
  factoryName: string;
  factoryAddress: string;
}

export interface FishingLogFormData {
  newLog: NewLogSection;
  permitDetails: PermitDetailsSection;
}