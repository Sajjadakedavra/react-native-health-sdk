import {optionalProps} from '../common';
import {BaseOptions, CommonOptions, GoogleFitOptions} from './inputTypes';

export const parseOptionsGoogle = (
  options: CommonOptions,
): GoogleFitOptions => {
  const baseOptions: BaseOptions = {
    startDate: options.startDate,
    endDate: options.endDate || new Date().toISOString(),
  };

  return optionalProps(baseOptions, {
    unit: options.unit,
    ascending: options.ascending,
    bucketUnit: options.bucketUnit,
    bucketInterval: options.bucketInterval,
    basalCalculation: options.basalCalculation,
  });
};
