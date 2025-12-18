/**
 * AI Studio API - Central Export
 *
 * This module provides a centralized export for all AI Studio API functions.
 * Import from this file for convenience:
 *
 * @example
 * import { useCases, models, versions, inference, monitoring } from '@/lib/api/ai-studio';
 *
 * // Use cases
 * const cases = await useCases.getUseCases();
 * const stats = await useCases.getUseCaseStats();
 *
 * // Models
 * const modelList = await models.getModelsByUseCaseId(useCaseId);
 *
 * // Versions
 * const versionList = await versions.getVersionsByModelId(useCaseId, modelId);
 *
 * // Inference
 * const result = await inference.runSingleInferenceByData(useCaseId, modelId, versionId, features);
 *
 * // Monitoring
 * const drift = await monitoring.getDriftMetrics(useCaseId, modelId, versionId);
 *
 * @module api/ai-studio
 */

// Import all API modules
import * as useCasesAPI from './use-cases';
import * as modelsAPI from './models';
import * as versionsAPI from './versions';
import * as inferenceAPI from './inference';
import * as monitoringAPI from './ai-studio-monitoring';

// Export as namespaced objects
export const useCases = useCasesAPI;
export const models = modelsAPI;
export const versions = versionsAPI;
export const inference = inferenceAPI;
export const monitoring = monitoringAPI;

// Also export individual functions for direct import
export {
  // Use Cases
  getUseCases,
  getUseCaseById,
  createUseCase,
  updateUseCase,
  deleteUseCase,
  getUseCaseStats,
} from './use-cases';

export {
  // Models
  getModelsByUseCaseId,
  getModelById,
  createModel,
  updateModel,
  deleteModel,
  getModelStats,
} from './models';

export {
  // Versions
  getVersionsByModelId,
  getVersionById,
  createVersion,
  updateVersion,
  deleteVersion,
  toggleDeployStatus,
  getVersionStats,
} from './versions';

export {
  // Inference
  runSingleInferenceById,
  runSingleInferenceByData,
  runBatchInferenceByIds,
  runBatchInferenceByData,
  getInferenceInsights,
  getInferenceHistory,
} from './inference';

export {
  // Monitoring
  getDriftMetrics,
  getAPIMetrics,
  getMonitoringOverview,
  subscribeToAIStudioMonitoring,
} from './ai-studio-monitoring';

// Default export with all namespaced APIs
export default {
  useCases,
  models,
  versions,
  inference,
  monitoring,
};
