
import React from 'react'
import { DataSet } from './dataset-card'

const DatasetsGrid = ({items}) => {
  return (
      <>
       <div className="flex-1 h-full w-full relative space-y-4">
            {items.map((item) => (
            <DataSet key={item.id} data={item}/>
            ))}
          </div></>
  )
}

export default DatasetsGrid