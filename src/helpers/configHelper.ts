import {NativeEventEmitter, NativeModules, Platform} from 'react-native';
import AppleHealthKit, { HealthValue } from 'react-native-health';
import {WEARABLES} from '../constants/genericConstants';
import {
  permissionsApple,
  permissionsGoogle,
} from '../constants/permissionConstants';
import GoogleFit from 'react-native-google-fit';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const getWearables = () => {
  switch (Platform.OS) {
    case 'android':
      return {
        SAMSUNG: WEARABLES.SAMSUNG,
        GARMIN: WEARABLES.GARMIN,
        FITBIT: WEARABLES.FITBIT,
      };

    case 'ios':
      return {
        GARMIN: WEARABLES.GARMIN,
        APPLE: WEARABLES.APPLE,
      };

    default:
      return {};
  }
};

export const setupEventListeners = () => {
  const emitter = new NativeEventEmitter(NativeModules.AppleHealthKit);

  emitter.addListener('healthKit:HeartRate:setup:success', () => {
    console.log('--> Heart Rate observer success');
    // getHeartRate();
  });
  emitter.addListener('healthKit:HeartRate:setup:failure', () => {
    console.log('--> Heart Rate observer failure');
    // getHeartRate();
  });

  emitter.addListener('healthKit:HeartRate:new', () => {
    console.log('--> Heart Rate observer triggered');
    // getHeartRate();
  });

  emitter.addListener('healthKit:HeartRate:failure', () => {
    console.log('--> Heart Rate observer failure');
    // getHeartRate();
  });

  emitter.addListener('healthKit:ActiveEnergyBurned:setup:success', () => {
    console.log('--> ActiveEnergyBurned observer success');
    // getCalories();
  });

  emitter.addListener('healthKit:ActiveEnergyBurned:new', () => {
    console.log('--> Active Energy observer triggered');
    // getCalories();
  });

  emitter.addListener('healthKit:ActiveEnergyBurned:setup:failure', () => {
    console.log('--> ActiveEnergyBurned observer enabled');
    // getHeartRate();
  });
  emitter.addListener('healthKit:ActiveEnergyBurned:failure', () => {
    console.log('--> ActiveEnergyBurned observer enabled');
    // getHeartRate();
  });

  return () => {
    emitter.removeAllListeners(NativeModules.AppleHealthKit); // Cleanup when the component unmounts
  };
};

const initializeAppleWearable = async () => {
  return new Promise((resolve, reject) => {
    AppleHealthKit.initHealthKit(
      permissionsApple,
      (error: string, results: HealthValue) => {
        if (error) {
          console.log('[ERROR] Cannot grant permissions!');
          reject(error);
        } else if (results === 1) {
          console.log('\nresults are ', results);
          console.log('\ninside true');
          setupEventListeners();
          resolve(true);
        } else {
          reject(error);
        }
      },
    );
  });
};

const initializeGoogleWearable = async (): Promise<boolean> => {
  try {
    // Request ACTIVITY_RECOGNITION permission
    const activityRecognitionResult = await request(
      PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION,
    );

    if (activityRecognitionResult !== RESULTS.GRANTED) {
      console.log('ACTIVITY_RECOGNITION permission denied. Returning false');
      // return false;
    }

    // Check if Google Fit is authorized
    const isAuthorized = await GoogleFit.checkIsAuthorized();

    if (!GoogleFit.isAuthorized) {
      // Try to authorize Google Fit
      const authResult = await GoogleFit.authorize(permissionsGoogle);

      if (authResult.success) {
        console.log('AUTH_SUCCESS');
        return true;
      } else {
        console.log('AUTH_DENIED: ' + authResult.message);
        return false;
      }
    } else {
      console.log('Google Fit is already authorized');
      return true;
    }
  } catch (error) {
    console.log('AUTH_ERROR', error);
    return false;
  }
};

export const initializeWearable = async () => {
  // TODO: upgrade it to "based on selected wearable" instead of platform
  switch (Platform.OS) {
    case 'ios':
      console.log('inside initializeWearable ios');
      return await initializeAppleWearable();
    case 'android':
      console.log('inside initializeWearable android');
      return await initializeGoogleWearable();
    default:
      throw new Error('Cant initialize wearable');
  }
};
