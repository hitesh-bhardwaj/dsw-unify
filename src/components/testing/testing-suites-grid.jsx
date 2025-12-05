import React from 'react'
import { TestingCard } from './testing-card'

/**
 * Component to display a grid of testing suites.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.items - An array of test suite objects to be displayed.
 * @returns {React.JSX.Element} The rendered TestingSuitesGrid component.
 */
const TestingSuitesGrid = ({items}) => {
  return (
   <>
    <div className="flex-1 h-full w-full relative space-y-4">
         {items.map((item) => (
           <TestingCard key={item.id} test={item} />
         ))}
       </div></>
  )
}

export default TestingSuitesGrid