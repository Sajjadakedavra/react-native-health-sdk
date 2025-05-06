import {Scopes} from 'react-native-google-fit';
import AppleHealthKit, {HealthKitPermissions} from 'react-native-health';

export const permissionsApple = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.ActivitySummary,
      AppleHealthKit.Constants.Permissions.StepCount,
      AppleHealthKit.Constants.Permissions.BodyMassIndex,
      AppleHealthKit.Constants.Permissions.Vo2Max,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
      AppleHealthKit.Constants.Permissions.HeartRateVariability,
      AppleHealthKit.Constants.Permissions.OxygenSaturation,
      AppleHealthKit.Constants.Permissions.RespiratoryRate,
      AppleHealthKit.Constants.Permissions.RestingHeartRate,
      AppleHealthKit.Constants.Permissions.BasalEnergyBurned,
    ],
  },
} as HealthKitPermissions;

export const permissionsGoogle = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_ACTIVITY_WRITE,
    Scopes.FITNESS_BODY_READ,
    Scopes.FITNESS_BODY_WRITE,
    Scopes.FITNESS_HEART_RATE_READ,
    Scopes.FITNESS_HEART_RATE_WRITE,
    Scopes.FITNESS_LOCATION_READ,
    Scopes.FITNESS_NUTRITION_WRITE,
    Scopes.FITNESS_NUTRITION_READ,
    Scopes.FITNESS_LOCATION_WRITE,
    Scopes.FITNESS_BLOOD_PRESSURE_READ,
    Scopes.FITNESS_BLOOD_PRESSURE_WRITE,
    Scopes.FITNESS_BLOOD_GLUCOSE_READ,
    Scopes.FITNESS_BLOOD_GLUCOSE_WRITE,
    Scopes.FITNESS_OXYGEN_SATURATION_READ,
    Scopes.FITNESS_OXYGEN_SATURATION_WRITE,
    Scopes.FITNESS_BODY_TEMPERATURE_READ,
    Scopes.FITNESS_BODY_TEMPERATURE_WRITE,
    Scopes.FITNESS_REPRODUCTIVE_HEALTH_READ,
    Scopes.FITNESS_REPRODUCTIVE_HEALTH_WRITE,
    Scopes.FITNESS_SLEEP_READ,
    Scopes.FITNESS_SLEEP_WRITE,
  ],
};
