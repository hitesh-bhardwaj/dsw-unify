"use client";

import { motion } from "framer-motion";
import { FeatureSectionGroup } from "./feature-section-group";

const sectionConfig = [
  {
    id: 'dataEngineering',
    title: 'Data Engineering',
    description: 'Data ingestion, validation, exploration, and feature engineering tools'
  },
  {
    id: 'featureStore',
    title: 'Feature Store',
    description: 'End-to-end ML workflow from feature selection to model deployment'
  },
  {
    id: 'aiStudio',
    title: 'AI Studio',
    description: 'End-to-end ML workflow from feature selection to model deployment'
  },
  {
    id: 'agentStudio',
    title: 'Agent Studio',
    description: 'Build and manage AI agents with comprehensive tooling'
  },
  {
    id: 'workflowBuilder',
    title: 'Workflow Builder',
    description: 'Design and orchestrate agentic AI workflows for complex business processes'
  }
];

/**
 * Container for all dashboard feature sections.
 * Renders all feature sections using the FeatureSectionGroup component.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.features - Features object containing arrays for each section:
 *   - dataEngineering: Array of data engineering features
 *   - featureStore: Array of feature store features
 *   - aiStudio: Array of AI studio features
 *   - agentStudio: Array of agent studio features
 *   - workflowBuilder: Array of workflow builder features
 * @returns {React.JSX.Element} The rendered FeatureSectionsContainer component.
 */
export function FeatureSectionsContainer({ features }) {
  return (
    <motion.div layout className="below-sections flex-1 overflow-auto p-6 pt-4 space-y-12 mt-6">
      {sectionConfig.map(section => (
        <FeatureSectionGroup
          key={section.id}
          title={section.title}
          description={section.description}
          features={features[section.id]}
        />
      ))}
    </motion.div>
  );
}
