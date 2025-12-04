import React from 'react'
import { TestingAnalyticsCard } from './testing-analytics-card'
import TestingGraph from './testing-graph'

/**
 * Component to display testing analytics including cards and a graph.
 *
 * @param {Object} props - The component props.
 * @param {Array<Object>} props.cardData - An array of data for the analytics cards.
 * @param {Array<Object>} props.analytics - The data for the analytics graph.
 * @param {string} props.tab - The current tab key.
 * @returns {React.JSX.Element} The rendered TestingAnalyticsComp component.
 */
const TestingAnalyticsComp = ({cardData, analytics,tab}) => {
  return (
    <>
      <div className="space-y-6">
          <div className="grid gap-6 grid-cols-4 h-fit">
            {cardData.map((card) => (
                <TestingAnalyticsCard cards={card} key={card.id} tab={tab} />
            ))}
          </div>
        
          <TestingGraph analytics={analytics} tab={tab}/>
        
      </div>
    </>
  )
}

export default TestingAnalyticsComp