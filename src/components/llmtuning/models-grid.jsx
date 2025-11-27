import React from 'react'
import { ModelsCard } from './models-card'

const ModelsGrid = ({items}) => {
  return (
    <>
     <div className="flex-1 h-full w-full relative space-y-4">
                {items.map((item) => (
                <ModelsCard key={item.id} data={item} playKey={"training-jobs"}/>
                ))}
              </div>
    </>
  )
}

export default ModelsGrid