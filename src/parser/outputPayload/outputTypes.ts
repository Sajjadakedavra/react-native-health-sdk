// TODO: problematic
export interface ParsedStep {
  date: string;
  value: number;
}

export interface ParsedHeight {
  value: number;
  startDate: string;
  endDate: string;
}

export interface ParsedBloodPressure {
  systolic: number;
  diastolic: number;
  startDate: string;
  endDate: string;
}

export interface ParsedHeartRate {
  value: number;
  startDate: string;
  endDate: string;
}

export interface ParsedCalories {
  value: number;
  startDate: string;
  endDate: string;
}

export interface ParsedDistance {
  value: number;
  startDate: string;
  endDate: string;
}

// TODO: problematic
export interface ParsedSleep {
  startDate: string;
  endDate: string;
  value: string;
}

export type ParsedResponse =
  | ParsedStep[]
  | ParsedHeight[]
  | ParsedBloodPressure[]
  | ParsedHeartRate[]
  | ParsedCalories[]
  | ParsedDistance[]
  | ParsedSleep[]
  | any;
