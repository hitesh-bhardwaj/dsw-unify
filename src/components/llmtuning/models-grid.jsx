import React from 'react'
import { ModelsCard } from './models-card'

/**
 * Component to display a grid of model cards.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.items - An array of model data objects to be displayed.
 * @returns {React.JSX.Element} The rendered ModelsGrid component.
 */
const ModelsGrid = ({items}) => {
  return (
    <>
     <div className="flex-1 h-full w-full relative pb-10 space-y-4">
                {items.map((item) => (
                <ModelsCard key={item.id} data={item} playKey={"training-jobs"}/>
                ))}
              </div>
    </>
  )
}

export default ModelsGrid