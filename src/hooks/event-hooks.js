import { useCallback } from 'react';

// key codes
export const ENTER_KEY = 13;

/**
 * Returns a callback function to be used in onKeyDown
 * Function will run if the keyCode parameter matches the user keyCode
 */
export function useOnKeyDown(callback, keyCode) {
  return useCallback((e) => {
    if (e.keyCode === keyCode) {
      callback();
    }
  }, [callback, keyCode]);
}
