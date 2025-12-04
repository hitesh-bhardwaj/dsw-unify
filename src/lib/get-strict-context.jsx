import * as React from 'react';

/**
 * Creates a React Context with a strict provider and consumer.
 * Ensures that the consumer is used within the provider, throwing an error otherwise.
 *
 * @param {string} [name] - The name of the context (used in the error message).
 * @returns {[React.FC<{value: any, children: React.ReactNode}>, () => any]} An array containing the Provider component and the useSafeContext hook.
 */
function getStrictContext(name) {
  const Context = React.createContext(undefined);

  /**
   * The strict provider component.
   *
   * @param {Object} props - The component props.
   * @param {any} props.value - The value to provide to the context.
   * @param {React.ReactNode} props.children - The children to render.
   * @returns {React.JSX.Element} The Provider element.
   */
  const Provider = ({
    value,
    children
  }) => <Context.Provider value={value}>{children}</Context.Provider>;

  /**
   * Hook to consume the context safely.
   *
   * @returns {any} The context value.
   * @throws {Error} If used outside the provider.
   */
  const useSafeContext = () => {
    const ctx = React.useContext(Context);
    if (ctx === undefined) {
      throw new Error(`useContext must be used within ${name ?? 'a Provider'}`);
    }
    return ctx;
  };

  return [Provider, useSafeContext];
}

export { getStrictContext };
