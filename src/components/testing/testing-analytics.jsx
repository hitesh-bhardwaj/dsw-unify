import React from 'react'
import { TestingAnalyticsCard } from './testing-analytics-card'
import TestingGraph from './testing-graph'
// import { FadeUp, FadeUpStagger, FadeUpItem } from '../animations/Fadeup'

const TestingAnalyticsComp = ({cardData, analytics}) => {
  return (
    <>
      <div className="space-y-6">
        {/* <FadeUpStagger staggerDelay={0.1} delay={0.3}> */}
          <div className="grid gap-6 grid-cols-4 h-fit">
            {cardData.map((card) => (
              // <FadeUpItem key={card.id}>
                <TestingAnalyticsCard cards={card} key={card.id}/>
              // </FadeUpItem>
            ))}
          </div>
        {/* </FadeUpStagger> */}
        
        {/* <FadeUpItem delay={0.4} duration={0.8}> */}
          <TestingGraph analytics={analytics}/>
        {/* </FadeUpItem> */}
      </div>
    </>
  )
}

export default TestingAnalyticsComp