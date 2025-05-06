enum BucketUnitEnum {
  NANOSECOND = 'NANOSECOND',
  MICROSECOND = 'MICROSECOND',
  MILLISECOND = 'MILLISECOND',
  SECOND = 'SECOND',
  MINUTE = 'MINUTE',
  HOUR = 'HOUR',
  DAY = 'DAY',
}

/**
 * items inside "[]" indicate required parameters
 * Apple methods: [startDate]
 * Exceptions -> getAllActivities(getSamples) [startDate, endDate, type]
 * Exceptions -> Getstepcount []
 *
 * * Google methods: [startDate, endDate]
 * Exceptions ->
 */
export interface CommonOptions {
  startDate: string; // required for all methods
  endDate?: string; // optional; default now for all methods
  unit?: string; // optional; default varies by method
  ascending?: boolean; // optional; default false for all methods
  limit?: number; // optional; specific to appleHealth methods
  date?: string; // optional; specific to getSteps
  includeManuallyAdded?: boolean; // optional; default true
  type?: 'Walking' | 'StairClimbing' | 'Running' | 'Cycling' | 'Workout'; // optional; specific to getSamples
  basalCalculation?: boolean; // optional, specific to getCalories for Google Fit
  bucketUnit?: BucketUnitEnum; // optional - default "DAY" for Google Fit
  bucketInterval?: number; // optional - default 1 for Google Fit
}

export interface BaseOptions {
  startDate: string;
  endDate: string;
}

export interface AppleHealthOptions {
  startDate: string;
  endDate?: string;
  unit?: string;
  ascending?: boolean;
  limit?: number;
  date?: string;
  includeManuallyAdded?: boolean;
  type?: 'Walking' | 'StairClimbing' | 'Running' | 'Cycling' | 'Workout';
}

export interface GoogleFitOptions {
  startDate: string;
  endDate: string;
  unit?: string;
  ascending?: boolean;
  bucketUnit?: BucketUnitEnum;
  bucketInterval?: number;
  basalCalculation?: boolean;
}

export type OptionsType = AppleHealthOptions | GoogleFitOptions;
