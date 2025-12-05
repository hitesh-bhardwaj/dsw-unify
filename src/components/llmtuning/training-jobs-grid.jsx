import React from 'react'
import { TrainingCard } from './training-card'

/**
 * Component to display a grid of training jobs.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.items - An array of training job data objects to be displayed.
 * @returns {React.JSX.Element} The rendered TrainingJobsGrid component.
 */
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