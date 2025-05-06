import React, {useEffect, useState} from 'react';
import useGoogleFit from './src/googleFit';
import useAppleHealthKit from './src/appleHealth';
import {PermissionsAndroid, Text, TouchableOpacity, View} from 'react-native';
import {initializeWearable} from './src/helpers/configHelper';
import {useHealthKit} from './src/hooks/useHealthKit';
import {request, PERMISSIONS} from 'react-native-permissions';
import {NativeModules, Platform} from 'react-native';

function App(): JSX.Element {
  const [isInitialized, setIsInitialized] = useState(false);
  // const {getStepCount, getHeartRate} = useAppleHealthKit();
  // const {getStepCount, getHeartRate, getHeight} = useGoogleFit();
  const {
    getStepCount,
    getHeartRate,
    getHydration,
    getVo2Max,
    getSleep,
    getCalories,
    getBloodPressure,
    getDistance,
    getHeight,
    getAllActivities,
    getRespiratoryRate,
    getSpO2,
    getHRV,
    getNutrition,
    getWeight,
  } = useHealthKit(); // passing setIsInitialized ensures automatic initalization
  // the following is a google fit payload that is sent to the apple health library
  // the result should be a successfull apple method call with correctly parsed payload keeping only relevnat properties
  const commonOptions = {
    startDate: '2023-01-01T00:00:00.000Z',
    // endDate: new Date().toISOString(),
    unit: 'bpm',
    ascending: undefined,
    bucketUnit: 'DAY',
    bucketInterval: 1,
    somepayload: 'asdsad',
  };

  const init = async () => {
    try {
      const initialized = await initializeWearable();
      setIsInitialized(initialized);
    } catch (error) {
      console.error('Initialization failed', error);
    }
  };
  useEffect(() => {
    // manual initialization
    init();

    // TODO: the following permission is also required but not incluede in google fit scopes
    // request(PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION).then((result) => {
    //   // …
    //   console.log('\nresult is ',result);
    // });
  }, []);

  const getData = async () => {
    const steps = await getStepCount(commonOptions);
    const heartRate = await getHeartRate(commonOptions);
    const Vo2Max = await getVo2Max(commonOptions);
    const calories = await getCalories(commonOptions);
    const respirotary = await getRespiratoryRate(commonOptions);
    const Sp02 = await getSpO2(commonOptions);
    const Hrv = await getHRV(commonOptions);
    const distance = await getDistance(commonOptions);

    return {
      steps,
      heartRate,
      Vo2Max,
      calories,
      respirotary,
      Sp02,
      Hrv,
      distance,
    };
  };

  const requestBluetoothPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        {
          title: 'Cool Photo App Camera Permission',
          message:
            'SDK needs access to your bluetooth ' +
            'so it can verify the connected wearable.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        startBluetoothScan();
        console.log('You can use the bluetooth');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const {BluetoothManagerModule} = NativeModules;

  const startBluetoothScan = async () => {
    try {
      const result = await BluetoothManagerModule.startScanning();
      console.log('Scan Result:', result);

      // Based on the result, initialize either Apple Health or Google Fit
      if (result.includes('Apple Watch')) {
        initializeAppleHealth();
      } else if (result.includes('wearable')) {
        initializeGoogleFit();
      } else {
        console.log('No wearable found.');
      }
    } catch (error) {
      console.error('Error scanning for Bluetooth devices:', error);
    }
  };

  const initializeAppleHealth = () => {
    console.log('Initializing Apple HealthKit...');
    // Apple HealthKit initialization code here
  };

  const initializeGoogleFit = () => {
    console.log('Initializing Google Fit...');
    // Google Fit initialization code here
  };

  useEffect(() => {
    console.log('\nisInitialized? ', isInitialized);
    if (!isInitialized) return;
    // getData().then(res => console.log('\nresponse is :', res));
    requestBluetoothPermission();
  }, [isInitialized]);

  return <View style={{backgroundColor: 'green', flex: 1}} />;
}

export default App;
