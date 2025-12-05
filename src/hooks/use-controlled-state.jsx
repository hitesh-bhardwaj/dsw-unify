import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/**
 * Hook to manage controlled and uncontrolled state.
 *
 * @param {Object} props - The hook properties.
 * @param {any} [props.value] - The controlled value.
 * @param {any} [props.defaultValue] - The default value for uncontrolled state.
 * @param {function} [props.onChange] - Callback function called when the state changes.
 * @returns {[any, function]} An array containing the current state and a function to update the state.
 */
export function useControlledState(props) {
  const { value, defaultValue, onChange } = props;

  const [state, setInternalState] = React.useState(value !== undefined ? value : (defaultValue));

  React.useEffect(() => {
    if (value !== undefined) setInternalState(value);
  }, [value]);

  const setState = React.useCallback((next, ...args) => {
    setInternalState(next);
    onChange?.(next, ...args);
  }, [onChange]);

  return [state, setState];
}
