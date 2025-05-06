import {Platform} from 'react-native';
import {
  AppleHealthOptions,
  CommonOptions,
  GoogleFitOptions,
} from './inputTypes';
import {parseOptionsApple} from './appleHealth';
import {parseOptionsGoogle} from './googleFit';
/**
 * Unified parser for input payloads
 * @param {object} options @type {CommonOptions}
 * @param {string} functionName
 * @returns {object} @type {AppleHealthOptions | GoogleFitOptions}
 */
export const parseOptions = (
  options: CommonOptions,
): AppleHealthOptions | GoogleFitOptions => {
  console.log('\ninside parser with payload: ', options);

  switch (Platform.OS) {
    // Apple HealthKit specific options
    case 'ios':
      const appleHealthOptions: AppleHealthOptions = parseOptionsApple(options);
      console.log('\ninside parser - appleHealhOptions: ', appleHealthOptions);
      return appleHealthOptions;

    case 'android':
      // Google Fit specific options
      const googleFitOptions: GoogleFitOptions = parseOptionsGoogle(options);
      console.log('\ninside parser - googleFitOptions: ', googleFitOptions);
      return googleFitOptions;

    default:
      throw new Error('Unsupported platform');
  }
};
