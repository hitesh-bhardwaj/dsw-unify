import React from 'react'

/**
 * Component to display an empty card with content centered.
 *
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The content to display inside the empty card.
 * @returns {React.JSX.Element} The rendered EmptyCard component.
 */
const EmptyCard=({ children })=> {
  return (
    <div className="w-full h-64 rounded-xl border border-border-color-0 flex justify-center items-center text-gray-500">
      <p>{children}</p>
    </div>
  );
}

export default EmptyCard