import {Platform} from 'react-native';
import {
  AppleHealthOptions,
  CommonOptions,
  GoogleFitOptions,
  OptionsType,
} from './inputPayload/inputTypes';
import {outputParsers} from './outputPayload/outputParser';

export const appleHealthRequiredParams = {
  getAllActivities: ['startDate'], // Docs don't mentiond parameter 'type' as optional but method works fine if we omit it therefore not mentioned here
  getStepCount: [],
};

// currently no methods present that have a required parameter
export const googleFitRequiredParams = {};

const getPlatformOptions = (): OptionsType => {
  //TODO: will replace this parameter by the wearable selected
  switch (Platform.OS) {
    case 'ios':
      return {} as AppleHealthOptions;
    case 'android':
      return {} as GoogleFitOptions;
    default:
      throw new Error(`Unsupported platform: ${Platform.OS}`);
  }
};

/**
 * Checks if the invoked method has additional required params
 * @param {string} platform
 * @param {string} functionName
 * @returns {Array}
 */
const getRequiredParams = (
  functionName: string,
  platform?: 'ios' | 'android', //TODO: will replace this parameter by the wearable selected
): string[] => {
  if (Platform.OS === 'ios') {
    return appleHealthRequiredParams[functionName] || [];
  } else if (platform === 'android') {
    return googleFitRequiredParams[functionName] || [];
  }
  return [];
};

/**
 * Checks if required params for some methods are present in input payload
 * @param {string} methodName
 * @param {CommonOptions} options
 * @returns {void}
 */
export const requiredParamsExist = (
  methodName: string,
  options: CommonOptions,
) => {
  const platformOptions = getPlatformOptions();
  let requiredParams = getRequiredParams(methodName);
  console.log('Required params are: ', requiredParams);
  // TODO: replace by wearable name
  // makes startDate mandatory for all input payloads except for apple's getStepCount method
  if (methodName !== 'getStepCount' && Platform.OS !== 'ios') {
    requiredParams = [...requiredParams, 'startDate'];
  }

  requiredParams.forEach(param => {
    if (!options[param as keyof typeof platformOptions]) {
      throw new Error(`Missing required parameter for ${methodName}: ${param}`);
    }
  });
};

/**
 * Adds key/value pairs to provided object only if they exist
 * @param {object} obj
 * @param {object} props
 * @returns {object}
 */
export const optionalProps = (obj: any, props: any) => {
  return Object.keys(props).reduce(
    (acc, key) => {
      if (props[key] !== undefined) {
        acc[key] = props[key];
      }
      return acc;
    },
    {...obj},
  );
};

/**
 * Removes a key if it exists from an object.
 * @param {object} obj The object to modify.
 * @param {string} key The key to remove.
 * @returns The modified object.
 */
const removeKeyIfExists = <T extends object>(obj: T, key: keyof T): T => {
  const newObj = {...obj};
  if (key in newObj) {
    delete newObj[key];
  }
  return newObj;
};

/**
 * Modifies input payload for some methods
 * @param {string} methodName The method's name.
 * @param {object} parsedPayload The object to modify.
 * @returns The modified object.
 */
export const modifyInputPayload = (
  methodName: string,
  parsedPayload: object,
) => {
  console.log('Modifying payload');
  const modifiedPayload = parsedPayload;
  switch (methodName) {
    case 'getCalories':
    case 'getAllActivities':
      return removeKeyIfExists(modifiedPayload, 'unit');
    default:
      return parsedPayload;
  }
};

/**
 * Modifies output payload for common methods
 * @param {string} methodName The method's name.
 * @param {any} response The response to modify.
 * @returns The modified response.
 */
export const parseOutputPayload = (methodName: string, response: any) => {
  const parser = outputParsers[methodName as keyof typeof outputParsers];
  if (parser) {
    console.log('\nparser found', parser);
    response = parser(response);
    console.log(`\nParsed response for ${methodName}:`, response);
  }
};
