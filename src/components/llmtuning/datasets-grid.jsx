
import React from 'react'
import { DataSet } from './dataset-card'

/**
 * Component to display a grid of datasets.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.items - An array of dataset objects to be displayed.
 * @returns {React.JSX.Element} The rendered DatasetsGrid component.
 */
const DatasetsGrid = ({items,onDelete}) => {
  return (
      <>
       <div className="flex-1 h-full w-full relative space-y-4 pb-10">
            {items.map((item) => (
            <DataSet key={item.id} data={item} id={item.id} onDelete={onDelete}/>
            ))}
          </div></>
  )
}

export default DatasetsGrid