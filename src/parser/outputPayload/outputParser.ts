import {Platform} from 'react-native';
import {
  ParsedBloodPressure,
  ParsedCalories,
  ParsedDistance,
  ParsedHeartRate,
  ParsedHeight,
  ParsedSleep,
  ParsedStep,
} from './outputTypes';

// TODO: problematic
export const parseSteps = (response: any): ParsedStep[] => {
  if (Platform.OS === 'android') {
    return response.flatMap((source: any) =>
      source.steps.map((step: any) => ({
        date: step.date,
        value: step.value,
      })),
    );
  } else if (Platform.OS === 'ios') {
    return response.map((step: any) => ({
      date: step.startDate,
      value: step.value, //sends aggregated steps instead of single steps for the day
    }));
  }
  return [];
};

export const parseHeight = (response: any): ParsedHeight[] => {
  if (Platform.OS === 'android') {
    return response.map((height: any) => ({
      value: height.value,
      startDate: height.startDate,
      endDate: height.endDate,
    }));
  } else if (Platform.OS === 'ios') {
    return response.map((height: any) => ({
      value: height.value,
      startDate: height.startDate,
      endDate: height.endDate,
    }));
  }
  return [];
};

export const parseBloodPressure = (response: any): ParsedBloodPressure[] => {
  if (Platform.OS === 'android') {
    return response.map((bp: any) => ({
      systolic: bp.systolic,
      diastolic: bp.diastolic,
      startDate: bp.startDate,
      endDate: bp.endDate,
    }));
  } else if (Platform.OS === 'ios') {
    return response.map((bp: any) => ({
      systolic: bp.bloodPressureSystolicValue,
      diastolic: bp.bloodPressureDiastolicValue,
      startDate: bp.startDate,
      endDate: bp.endDate,
    }));
  }
  return [];
};

export const parseHeartRate = (response: any): ParsedHeartRate[] => {
  if (Platform.OS === 'android') {
    return response.map((hr: any) => ({
      value: hr.value,
      startDate: hr.startDate,
      endDate: hr.endDate,
    }));
  } else if (Platform.OS === 'ios') {
    return response.map((hr: any) => ({
      value: hr.value,
      startDate: hr.startDate,
      endDate: hr.endDate,
    }));
  }
  return [];
};

export const parseCalories = (response: any): ParsedCalories[] => {
  if (Platform.OS === 'android') {
    return response.map((cal: any) => ({
      value: cal.calorie,
      startDate: cal.startDate,
      endDate: cal.endDate,
    }));
  } else if (Platform.OS === 'ios') {
    return response.map((cal: any) => ({
      value: cal.value,
      startDate: cal.startDate,
      endDate: cal.endDate,
    }));
  }
  return [];
};

export const parseDistance = (response: any): ParsedDistance[] => {
  if (Platform.OS === 'android') {
    return response.map((dist: any) => ({
      value: dist.distance,
      startDate: dist.startDate,
      endDate: dist.endDate,
    }));
  } else if (Platform.OS === 'ios') {
    return response.map((dist: any) => ({
      value: dist.value,
      startDate: dist.startDate,
      endDate: dist.endDate,
    }));
  }
  return [];
};

// TODO: problematic
export const parseSleep = (response: any): ParsedSleep[] => {
  // TODO: change to wearable later
  if (Platform.OS === 'android') {
    return response.map((sleep: any) => ({
      startDate: sleep.startDate,
      endDate: sleep.endDate,
      value: sleep.granularity, //entire granularity object - this differes vastly from apple health
    }));
  } else if (Platform.OS === 'ios') {
    return response.map((sleep: any) => ({
      startDate: sleep.startDate,
      endDate: sleep.endDate,
      value: sleep.value,
    }));
  }
  return [];
};

export const outputParsers = {
  getStepCount: parseSteps,
  getHeight: parseHeight,
  getBloodPressure: parseBloodPressure,
  getHeartRate: parseHeartRate,
  getCalories: parseCalories,
  getDistance: parseDistance,
  getSleep: parseSleep,
};
