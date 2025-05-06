import { modifyInputPayload, parseOutputPayload, requiredParamsExist } from '../parser/common';
import { outputParsers } from '../parser/outputPayload/outputParser';
import { ParsedResponse } from '../parser/outputPayload/outputTypes';
import {parseOptions} from '../parser/inputPayload/inputParser';
import { CommonOptions } from '../parser/inputPayload/inputTypes';

/**
 * Proxy to check if the invoked method exists to prevent app crash
 * @param {Record<string, Function>} methodsObject
 * @returns {Function}
 */
export const createMethodProxy = (methodsObject: Record<string, Function>) => {
  return new Proxy(methodsObject, {
    get(target, prop) {
      if (prop in target) {
        return target[prop as keyof typeof target];
      } else {
        return () => {
          console.warn(`Method ${String(prop)} does not exist.`);
        };
      }
    },
  });
};

/**
 * Middleware the executes before the execution of the intended method
 * @param {Function} method
 * @returns {Function}
 */
export const withMiddleware = <T extends (...args: any[]) => any>(
  method: T,
) => {
  return async (...args: Parameters<T>): Promise<ParsedResponse> => {
    try {
      console.log(`\nExecuting ${method.name} with middleware... `, ...args);
      // Add any pre-execution logic here
      const commonOptions = {...args}[0];
      const shouldParseOutput = {...args}?.[1];

      //check for absolutely essential key/value pairs in the input payload
      requiredParamsExist(method.name, commonOptions);

      //removes any app-crashing key/value pairs from the input payload
      let parsed = modifyInputPayload(method.name, commonOptions);
      parsed = parseOptions(parsed as CommonOptions);
      console.log(
        `Parsed payload for ${method.name} is: ${JSON.stringify(parsed)}`,
      );

      let response = await method(parsed, ...args);

      //parse output payload for common methods if developer requested
      if (shouldParseOutput) {
        parseOutputPayload(method.name, response);
      }

      console.log(`response for ${method.name} is: ${response}`);
      return response;
    } catch (error) {
      console.error(`Error executing ${method.name}:`, error);
    }
  };
};
