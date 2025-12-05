import React from 'react'
import { LLMCard } from './LLMCard'

/**
 * Component to display a grid of LLM cards.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.items - An array of LLM data objects to be displayed.
 * @returns {React.JSX.Element} The rendered LLMGrid component.
 */
const LLMGrid = ({items}) => {
  return (
   <>
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch">
         {items.map((llm) => (
           <LLMCard key={llm.id} llm={llm} />
         ))}
       </div></>
  )
}

export default LLMGrid