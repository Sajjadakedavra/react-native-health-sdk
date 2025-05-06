# React Native Wearable Health Data Library

This library provides a unified interface for interacting with various wearable devices such as Google Fit and Apple Health. It enables developers to access health data like steps, heart rate, calories, and more, across different platforms. 

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [Initialization](#initialization)
- [Methods](#methods)
  - [Step Count](#getstepcount)
  - [Calories](#getcalories)
  - [Heart Rate](#getheartrate)
  - [Blood Pressure](#getbloodpressure)
  - [Distance](#getdistance)
  - [Sleep](#getsleep)
  - [Height](#getheight)
  - [Activities](#getallactivities)
  - [Respiratory Rate (Apple Health)](#getrespiratoryrate)
  - [VO2 Max (Apple Health)](#getvo2max)
  - [SpO2 (Apple Health)](#getspo2)
  - [HRV (Apple Health)](#gethrv)
  - [Weight (Google Fit)](#getweight)
  - [Nutrition (Google Fit)](#getnutrition)
  - [Hydration (Google Fit)](#gethydration)
- [Common Options](#common-options)
- [Error Handling](#error-handling)
- [License](#license)

## Installation

```npm install react-native-wearable-health```
or
```yarn add react-native-wearable-health```

## Setup
Follow the platform-specific setup instructions for both Google Fit and Apple Health.

### Google Fit Setup
1. Add the required permissions to your AndroidManifest.xml.
Note: following permission is required to get steps:
```
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
```
2. Configure the Google Fit API.

### Apple Health Setup
1. Add the HealthKit permission to your app.
Note: following should be added to the info.plist
```
<key>NSHealthShareUsageDescription</key>
<string>Read and understand health data.</string>
<key>NSHealthUpdateUsageDescription</key>
<string>Share workout data with other apps.</string>
<!-- Below is only required if requesting clinical health data -->
<key>NSHealthClinicalHealthRecordsShareUsageDescription</key>
<string>Read and understand clinical health data.</string>

```
2. Configure the Apple Health API.

## Usage

### Importing the Hook
```
import { useHealthKit, initializeWearable } from 'react-native-wearable-health';
```

### Initializing the Wearable
```
const initialized = await initializeWearable();
```
This method returns a boolean indicating whether the permissions were successfully granted.

### Using Health Data Methods
```
const { getStepCount, getCalories, getHeartRate } = useHealthKit();
const commonOptions = {
  startDate: '2024-01-01T00:00:00Z',
  endDate: '2024-01-31T23:59:59Z',
};

const steps = await getStepCount(commonOptions);
```

## Methods
The library exposes several methods to retrieve health data. These methods will check if the corresponding method exists for the selected wearable. If the method doesn’t exist, a warning will be displayed.

### getStepCount
Fetches the step count for a given period.
```
const steps = await getStepCount(commonOptions);
```

### getCalories
Fetches the calories burned for a given period.
```
const calories = await getCalories(commonOptions);
```

### getHeartRate
Fetches the heart rate samples for a given period.
```
const heartRate = await getHeartRate(commonOptions);
```

### getBloodPressure
Fetches the blood pressure samples for a given period.
```
const bloodPressure = await getBloodPressure(commonOptions);
```

### getDistance
Fetches the distance walked or run for a given period.
```
const distance = await getDistance(commonOptions);
```

### getSleep
Fetches the sleep data for a given period.
```
const sleep = await getSleep(commonOptions);
```

### getHeight
Fetches the height samples for a given period.
```
const height = await getHeight(commonOptions);
```

### getAllActivities
Fetches the activity samples for a given period.
```
const activities = await getAllActivities(commonOptions);
```

### getRespiratoryRate
Fetches the respiratory rate samples for a given period (Apple Health only).
```
const respiratoryRate = await getRespiratoryRate(commonOptions);
```

### getVo2Max
Fetches the VO2 Max samples for a given period (Apple Health only).
```
const vo2Max = await getVo2Max(commonOptions);
```

### getSpO2
Fetches the oxygen saturation samples for a given period (Apple Health only).
```
const spo2 = await getSpO2(commonOptions);
```

### getHRV
Fetches the heart rate variability samples for a given period (Apple Health only).
```
const hrv = await getHRV(commonOptions);
```

### getWeight
Fetches the weight samples for a given period (Google Fit only).
```
const weight = await getWeight(commonOptions);
```

### getNutrition
Fetches the nutrition data for a given period (Google Fit only).
```
const nutrition = await getNutrition(commonOptions);
```

### getHydration
Fetches the hydration data for a given period (Google Fit only).
```
const hydration = await getHydration(commonOptions);
```

### Common Options
All methods accept a CommonOptions object that includes parameters like `startDate`, `endDate`, `unit`, and more.

### CommonOptions Schema
```
export interface CommonOptions {
  startDate: string; // required for all methods
  endDate?: string; // optional; default now for all methods
  unit?: string; // optional; default varies by method
  ascending?: boolean; // optional; default false for all methods
  limit?: number; // optional; specific to Apple Health methods
  date?: string; // optional; specific to getSteps
  includeManuallyAdded?: boolean; // optional; default true
  type?: 'Walking' | 'StairClimbing' | 'Running' | 'Cycling' | 'Workout'; // optional; specific to getSamples
  basalCalculation?: boolean; // optional, specific to getCalories for Google Fit
  bucketUnit?: BucketUnitEnum; // optional - default "DAY" for Google Fit
  bucketInterval?: number; // optional - default 1 for Google Fit
}
```

## Error Handling
Each method returns an error if there is an issue retrieving data. It’s essential to handle these errors to ensure a smooth user experience.
```
try {
  const steps = await getStepCount(commonOptions);
} catch (error) {
  console.error('Error fetching step count:', error);
}
```