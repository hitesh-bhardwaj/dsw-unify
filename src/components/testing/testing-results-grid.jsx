import React from 'react'
import { TestingCardResults } from './testing-card-results'

/**
 * Component to display a grid of testing results.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.items - An array of test result objects to be displayed.
 * @returns {React.JSX.Element} The rendered TestingResultsGrid component.
 */
const TestingResultsGrid = ({items}) => {
  return (
   <>
    <div className="flex-1 h-full w-full relative space-y-4">
         {items.map((item) => (
           <TestingCardResults key={item.id} test={item} />
         ))}
       </div></>
  )
}

export default TestingResultsGrid