import {optionalProps} from '../common';
import {AppleHealthOptions, BaseOptions, CommonOptions} from './inputTypes';

export const parseOptionsApple = (
  options: CommonOptions,
): AppleHealthOptions => {
  const baseOptions: BaseOptions = {
    startDate: options.startDate,
    endDate: options.endDate || new Date().toISOString(),
  };

  return optionalProps(baseOptions, {
    unit: options.unit,
    ascending: options.ascending,
    limit: options.limit,
    date: options.date,
    includeManuallyAdded: options.includeManuallyAdded,
    type: options.type,
  });
};
