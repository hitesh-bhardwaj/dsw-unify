import React from 'react'
import { TrainingCard } from './training-card'

const TrainingJobsGrid = ({items}) => {
  return (
    <>
     <div className="flex-1 h-full w-full relative space-y-4">
                {items.map((item) => (
                <TrainingCard key={item.id} data={item} playKey={"training-jobs"}/>
                ))}
              </div>
    </>
  )
}

export default TrainingJobsGrid