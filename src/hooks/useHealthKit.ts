import {Platform} from 'react-native';
import useAppleHealthKit from '../appleHealth';
import useGoogleFit from '../googleFit';

/**
 * returns respective library's health kit hook
 * @param {SetStateAction<boolean> | undefined} setIsInitialized
 * @returns {Promise}
 */
export const useHealthKit = (
  setIsInitialized?: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  // Call both hooks
  const googleFit = useGoogleFit(setIsInitialized);
  const appleHealthKit = useAppleHealthKit(setIsInitialized);

  // Return only the appropriate hook's values based on the platform
  // TODO: upgrade it to "based on selected wearable" instead of platform
  return Platform.OS === 'ios' ? appleHealthKit : googleFit;
};
