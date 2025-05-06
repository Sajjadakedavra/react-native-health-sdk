import {useEffect} from 'react';
import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import AppleHealthKit, {
  BloodPressureSampleValue,
  HealthInputOptions,
  HealthValue,
} from 'react-native-health';
import {permissionsApple} from '../constants/permissionConstants';
import {createMethodProxy, withMiddleware} from '../middleware';
import {CommonOptions} from '../parser/inputPayload/inputTypes';
import { setupEventListeners } from '../helpers/configHelper';

const useAppleHealthKit = (
  setIsInitialized?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  useEffect(() => {
    const initializeAppleHealthKit = () => {
      AppleHealthKit.initHealthKit(permissionsApple, (error: string) => {
        /* Called after we receive a response from the system */
        if (error) {
          console.log('[ERROR] Cannot grant permissions!');
        } else {
          setIsInitialized?.(true);
          setupEventListeners();
        }
      });
    };
    // TODO: replace platfrom by selected wearable device
    // if setIsInitialized is sent then enable automatic intialization as soon as hook is called
    if (Platform.OS === 'ios' && setIsInitialized) {
      initializeAppleHealthKit();
    }
  }, []);

  /**
   * BACKGROUND OBSERVER ONLY AVAILABLE FOR THE FOLLOWING
    ActiveEnergyBurned
    BasalEnergyBurned
    Cycling
    InsulinDelivery
    HeartRate
    HeartRateVariabilitySDNN
    RestingHeartRate
    Running
    StairClimbing
    StepCount
    Swimming
    Vo2Max
    Walking
    Workout
   */

  /* Can now read or write to HealthKit */

  // Get the current date
  const currentDate = new Date();

  /* Monthly Date Calculation Start */

  // Get the first day of the current month
  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
  );

  // Get the last day of the current month
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
  );

  /* Monthly Date Calculation End */

  /* Weekly Date Calculation Start */

  // Calculate the difference in days between the current day and Monday (0 is Sunday, 1 is Monday, ..., 6 is Saturday)
  const daysUntilMonday = (1 - currentDate.getDay() + 7) % 7;

  // Calculate the start date of the current week (Monday)
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate() - daysUntilMonday,
  );

  // Calculate the end date of the current week (Sunday)
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  /* Weekly Date Calculation End */

  /**
   * Max available health input options
   */
  const healthInputOptions: HealthInputOptions = {
    startDate: firstDayOfMonth.toISOString(), // Start date is the first day of the current month
    endDate: lastDayOfMonth.toISOString(), // End date is the last day of the current month
    ascending: true, // Optional
    includeManuallyAdded: true, // Optional
    period: 1440,
    unit: 'hour',
  };
  /* Max available health input options End */

  const getRespiratoryRate = (
    parsedOptions: CommonOptions,
  ): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getRespiratoryRateSamples(
        parsedOptions,
        (error: unknown, results: HealthValue[]) => {
          if (error) {
            console.error('Error in getRespiratoryRate:', error);
            reject(error);
          } else {
            console.log('getRespiratoryRate', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getVo2Max = (parsedOptions: CommonOptions): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getVo2MaxSamples(
        parsedOptions,
        (error: unknown, results: HealthValue[]) => {
          if (error) {
            console.error('Error in getVo2Max:', error);
            reject(error);
          } else {
            console.log('getVo2MaxSamples', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getSpO2 = (parsedOptions: CommonOptions): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getOxygenSaturationSamples(
        parsedOptions,
        (error: unknown, results: HealthValue[]) => {
          if (error) {
            console.error('Error in getSpO2:', error);
            reject(error);
          } else {
            console.log('getOxygenSaturationSamples', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getHRV = (parsedOptions: CommonOptions): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getHeartRateVariabilitySamples(
        parsedOptions,
        (error: unknown, results: HealthValue[]) => {
          if (error) {
            console.error('Error in getHRV:', error);
            reject(error);
          } else {
            console.log('getHeartRateVariabilitySamples', results);
            resolve(results);
          }
        },
      );
    });
  };

  // ------ COMMON METHODS

  const getCalories = (
    parsedOptions: CommonOptions,
  ): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getActiveEnergyBurned(
        parsedOptions,
        (error: string, results: HealthValue[]) => {
          if (error) {
            console.error('Error in getCalories:', error);
            reject(error);
          } else {
            console.log('results calories', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getAllActivities = (
    parsedOptions: CommonOptions,
  ): Promise<Object[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getSamples(
        parsedOptions,
        (error: Object, results: Object[]) => {
          if (error) {
            console.error('Error in getAllActivities:', error);
            reject(error);
          } else {
            console.log('getAllActivities', results);
            resolve(results);
          }
        },
      );
    });
  };

  // TODO: needs to be handled since its parameters are all optional and has "date" instead of start and end date parameter
  const getStepCount = (parsedOptions: CommonOptions): Promise<HealthValue> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getStepCount(
        parsedOptions,
        (error: string, results: HealthValue) => {
          if (error) {
            console.error('Error in getting steps', error);
            reject(error);
          } else {
            console.log('Result Step', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getHeartRate = (
    parsedOptions: CommonOptions,
  ): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getHeartRateSamples(
        parsedOptions,
        (error: string, results: HealthValue[]) => {
          if (error) {
            console.error('Error in getting heart rate sample', error);
            reject(error);
          } else {
            console.log('Result Heart rate', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getBloodPressure = (
    parsedOptions: CommonOptions,
  ): Promise<BloodPressureSampleValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getBloodPressureSamples(
        parsedOptions,
        (error: string, results: BloodPressureSampleValue[]) => {
          if (error) {
            console.error('Error in getting blood pressure sample', error);
            reject(error);
          } else {
            console.log('Result blood pressure', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getDistance = (parsedOptions: CommonOptions): Promise<Object[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getDailyDistanceWalkingRunningSamples(
        parsedOptions,
        (error: Object, results: Object[]) => {
          if (error) {
            console.error('Error in getting distance sample', error);
            reject(error);
          } else {
            console.log('Result getDistance ', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getSleep = (parsedOptions: CommonOptions): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getSleepSamples(
        parsedOptions,
        (error: Object, results: HealthValue[]) => {
          if (error) {
            console.error('Error in getting sleep sample', error);
            reject(error);
          } else {
            console.log('Result getSleep ', results);
            resolve(results);
          }
        },
      );
    });
  };

  const getHeight = (parsedOptions: CommonOptions): Promise<HealthValue[]> => {
    return new Promise((resolve, reject) => {
      AppleHealthKit.getHeightSamples(
        parsedOptions,
        (error: Object, results: HealthValue[]) => {
          if (error) {
            console.error('Error getting height sample ', error);
            reject(error);
          } else {
            console.log('Result getHeight', results);
            resolve(results);
          }
        },
      );
    });
  };

  const appleHealthMethods = {
    getStepCount,
    getCalories,
    getHeartRate,
    getBloodPressure,
    getDistance,
    getSleep,
    getHeight,
    getAllActivities,
    getRespiratoryRate,
    getVo2Max,
    getSpO2,
    getHRV,
  };

  // wrapping methods in middleware
  const methodsWithMiddleware = Object.fromEntries(
    Object.entries(appleHealthMethods).map(([name, method]) => [
      name,
      withMiddleware(method),
    ]),
  );

  // wrapping methods in proxy to prevent app crash if method doesn't exist
  const methodsWithProxy = createMethodProxy(methodsWithMiddleware);

  return methodsWithProxy;
};

export default useAppleHealthKit;
