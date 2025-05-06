/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {Platform} from 'react-native';

import GoogleFit from 'react-native-google-fit';
import {permissionsGoogle} from '../constants/permissionConstants';
import {createMethodProxy, withMiddleware} from '../middleware';
import {CommonOptions} from '../parser/inputPayload/inputTypes';

const useGoogleFit = (
  setIsInitialized?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  //Check if the app has authorized google fit access
  useEffect(() => {
    const checkAuthPermissions = async () => {
      const isAuthorized = await GoogleFit.checkIsAuthorized();
      if (!GoogleFit.isAuthorized) {
        try {
          const authResult = await GoogleFit.authorize(permissionsGoogle);
          if (authResult.success) {
            console.log('AUTH_SUCCESS');
            // if successfully authorized, fetch data
            setIsInitialized?.(true);
          } else {
            console.log('AUTH_DENIED ' + JSON.stringify(authResult));
          }
        } catch (error) {
          console.log('AUTH_ERROR', error);
        }
      } else {
        //call any inital fetch function here
      }
      return isAuthorized;
    };
    // TODO: replace platfrom by selected wearable device
    // if setIsInitialized is sent then enable automatic intialization as soon as hook is called
    if (Platform.OS === 'android' && setIsInitialized) {
      checkAuthPermissions();
    }
  }, []);

  //Listener
  GoogleFit.onAuthorize(() => {
    console.log('AUTH SUCCESS');
  });

  //Listener
  GoogleFit.onAuthorizeFailure(() => {
    console.log('AUTH ERROR');
  });

  const saveWeightPayload = {
    value: 100,
    date: new Date().toISOString(),
    unit: 'kg',
  };

  async function saveWeight() {
    GoogleFit.saveWeight(saveWeightPayload, (err, res) => {
      if (err) {
        throw 'Cant save data to the Google Fit';
      }
      if (res) {
        console.log('saved weight ', res);
      }
    });
  }

  async function getStepCount(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getStepCount google fit: ', parsedOptions);
      const res = await GoogleFit.getDailyStepCountSamples(parsedOptions);
      console.log('\nGoogleFit.getDailyStepCountSamples', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getDailyStepCountSamples error ', error);
      throw error;
    }
  }

  async function getWeight(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getWeight google fit: ', parsedOptions);
      const res = await GoogleFit.getWeightSamples(parsedOptions);
      console.log('\nGoogleFit.getWeightSamples', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getWeightSamples error ', error);
      throw error;
    }
  }

  async function getHeight(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getHeight google fit: ', parsedOptions);
      const res = await GoogleFit.getHeightSamples(parsedOptions);
      console.log('\nGoogleFit.getHeightSample', res); //res[0].value //in meters
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getHeightSample error ', error);
      throw error;
    }
  }

  async function getHeartRate(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getHeartRate google fit: ', parsedOptions);
      const res = await GoogleFit.getHeartRateSamples(parsedOptions);
      console.log('\nGoogleFit.getHeartRateSamples', res);
      return res;

      // const restingheartrate = await GoogleFit.getRestingHeartRateSamples(
      //   parsedOptions,
      // );
      // console.log('\nGoogleFit.getRestingHeartRateSamples', restingheartrate);
    } catch (error) {
      console.log('\ngetHeatRate google error: ', error);
      throw error;
    }
  }

  async function getBloodPressure(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getBloodPressure google fit: ', parsedOptions);
      const res = await GoogleFit.getBloodPressureSamples(parsedOptions);
      console.log('\nGoogleFit.getBloodPressureSamples', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getBloodPressureSamples error ', error);
      throw error;
    }
  }

  //returns array of obj containing infromation about specific activities
  async function getAllActivities(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getAllActivities google fit: ', parsedOptions);
      const res = await GoogleFit.getActivitySamples(parsedOptions);
      console.log('\nGoogleFit.getActivitySamples', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getActivitySamples error ', error);
      throw error;
    }
  }

  async function getCalories(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getCalories google fit: ', parsedOptions);
      const res = await GoogleFit.getDailyCalorieSamples(parsedOptions);
      console.log('\nGoogleFit.getDailyCalorieSamples', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getDailyCalorieSamples error ', error);
      throw error;
    }
  }

  async function getDistance(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getDistance google fit: ', parsedOptions);
      const res = await GoogleFit.getDailyDistanceSamples(parsedOptions);
      console.log('\nGoogleFit.getDailyDistanceSamples ', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getDailyDistanceSamples error ', error);
      throw error;
    }
  }

  async function getNutrition(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getNutrition google fit: ', parsedOptions);
      const res = await GoogleFit.getDailyNutritionSamples(parsedOptions);
      console.log('\nGoogleFit.getDailyNutritionSamples ', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getDailyNutritionSamples error ', error);
      throw error;
    }
  }

  async function getHydration(parsedOptions: CommonOptions) {
    try {
      console.log(
        '\nGoogleFit.running getHydration google fit: ',
        parsedOptions,
      );
      const res = await GoogleFit.getHydrationSamples(parsedOptions);
      console.log('\nGoogleFit.getHydrationSamples ', res); //returns an array of objects having a property of "waterConsumed"
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getHydrationSamples error ', error);
      throw error;
    }
  }

  async function getSleep(parsedOptions: CommonOptions) {
    try {
      console.log('\nrunning getSleep google fit: ', parsedOptions);
      const res = await GoogleFit.getSleepSamples(parsedOptions, true);
      console.log('\nGoogleFit.getSleepSamples ', res);
      return res;
    } catch (error) {
      console.log('\nGoogleFit.getSleepSamples error ', error);
      throw error;
    }
  }

  const googleFitMethods = {
    getStepCount,
    getCalories,
    getHeartRate,
    getBloodPressure,
    getDistance,
    getSleep,
    getHeight,
    getAllActivities,
    getWeight, //not in apple health
    getNutrition, //not in apple health
    getHydration, ////not in apple health
  };

  // wrapping methods in middleware
  const methodsWithMiddleware = Object.fromEntries(
    Object.entries(googleFitMethods).map(([name, method]) => [
      name,
      withMiddleware(method),
    ]),
  );

  // wrapping methods in proxy to prevent app crash if method doesn't exist
  const methodsWithProxy = createMethodProxy(methodsWithMiddleware);

  return methodsWithProxy;
};

export default useGoogleFit;
