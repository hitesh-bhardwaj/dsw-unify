import React from 'react'
import LLMDashboard from '../monitoring/LLMDashboard'
import ErrorMetricsDashboard from '../monitoring/ErrorMetricsDashboard'
import TrafficMetricsAgents from './MonitoringGraphs/TrafficMetricsAgents'
import GuardrailsDashboardAgents from './MonitoringGraphs/GuardrailsDashboardAgents'
import SuccessMonitoringAgents from './MonitoringGraphs/SuccessMonitoringAgents'
import LatencyDashboardAgents from './MonitoringGraphs/LatencyDashboardAgents'
import LLMDashboardAgents from './MonitoringGraphs/LLMDashboardAgents'

const MonitoringTab = ({ agentId }) => {
    return (
        <>
            <div className="space-y-6">
                <TrafficMetricsAgents />
                <GuardrailsDashboardAgents/>
                <LatencyDashboardAgents />
                <LLMDashboardAgents />
                <div className='!overflow-y-hidden h-215'>
                <ErrorMetricsDashboard agentId={agentId} />
                </div>
               <SuccessMonitoringAgents/>
              
            </div>
        </>
    )
}

export default MonitoringTab