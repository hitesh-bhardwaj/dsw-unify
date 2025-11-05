import React from 'react'
import { LLMCard } from '../LLMCard'

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