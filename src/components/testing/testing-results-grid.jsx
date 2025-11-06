import React from 'react'
import { TestingCardResults } from './testing-card-results'

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