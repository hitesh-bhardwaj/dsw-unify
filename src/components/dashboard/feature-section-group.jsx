"use client";

import { motion } from "framer-motion";
import { SectionHeader } from "@/components/home/section-header";
import { FeatureCard } from "@/components/home/feature-card";

/**
 * Reusable feature section group component that displays a section header
 * and a grid of feature cards.
 *
 * @param {Object} props - The component props.
 * @param {string} props.title - Section title to display.
 * @param {string} props.description - Section description text.
 * @param {Array<Object>} props.features - Array of feature objects to display as cards.
 * @returns {React.JSX.Element|null} The rendered FeatureSectionGroup component, or null if no features.
 */
export function FeatureSectionGroup({ title, description, features }) {
  if (!features?.length) return null;

  return (
    <motion.div layout className="space-y-6">
      <SectionHeader title={title} description={description} />
      <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard key={index} {...feature} index={index} />
        ))}
      </motion.div>
    </motion.div>
  );
}
