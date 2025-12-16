import React from 'react'
import TrafficMetricsDashboard from '../monitoring/TrafficMonitoringDashboard'
import GuardrailsDashboard from '../monitoring/GuardrailsDashboard'
import LatencyDashboard from '../monitoring/LatencyDashboard'
import LLMDashboard from '../monitoring/LLMDashboard'
import ErrorMetricsDashboard from '../monitoring/ErrorMetricsDashboard'
import SuccessMetricsDashboard from '../monitoring/SuccessMetricsDashboard'

const MonitoringTab = () => {
    return (
        <>
            <div className="space-y-6">
                <TrafficMetricsDashboard />
                <GuardrailsDashboard />
                <LatencyDashboard />
                <LLMDashboard />
                <ErrorMetricsDashboard />
                <SuccessMetricsDashboard />
            </div>
        </>
    )
}

export default MonitoringTab