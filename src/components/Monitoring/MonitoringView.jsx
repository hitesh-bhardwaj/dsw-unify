import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CustomBarChart, CustomLineChart } from "../common/Graphs/graphs";
import { Badge } from "../ui/badge";
import { subscribeToAIStudioMonitoring, getMonitoringOverview } from "@/lib/api/ai-studio";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

const MonitoringView = ({ useCaseId: propUseCaseId, modelId: propModelId, versionId: propVersionId }) => {
  const params = useParams();
  const { id: paramUseCaseId, modelId: paramModelId, versionId: paramVersionId } = params || {};

  // Use props if provided, otherwise fall back to route params
  const useCaseId = propUseCaseId || paramUseCaseId;
  const modelId = propModelId || paramModelId;
  const versionId = propVersionId || paramVersionId;

  const [driftedFeatures, setdriftedFeatures] = useState(0);
  const [totalFeatures, setTotalFeatures] = useState(0);
  const [avgLatency, setAvgLatency] = useState(0);

  const [requestRate, setRequestRate] = useState(0);
  const [successRate, setSuccessRate] = useState(0);
  const [error4xx, setError4xx] = useState(0);
  const [error5xx, setError5xx] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial monitoring data
  useEffect(() => {
    async function fetchMonitoringData() {
      try {
        setIsLoading(true);

        // Default mock data for standalone pages
        const MOCK_DATA = {
          drift: { totalFeatures: 21, driftedFeatures: 156 },
          api: { requestRate: 1.85, successRate: 0.78, error4xx: 0.42, error5xx: 0.42 }
        };

        // If we have actual numeric IDs, fetch from API, otherwise use mock data
        if (useCaseId && modelId && versionId && !isNaN(Number(useCaseId))) {
          const data = await getMonitoringOverview(useCaseId, modelId, versionId);

          // Set drift metrics
          if (data.drift) {
            setTotalFeatures(data.drift.totalFeatures || MOCK_DATA.drift.totalFeatures);
            setdriftedFeatures(data.drift.driftedFeatures || MOCK_DATA.drift.driftedFeatures);
          }

          // Set API metrics
          if (data.api) {
            setRequestRate(data.api.requestRate || MOCK_DATA.api.requestRate);
            setSuccessRate(data.api.successRate || MOCK_DATA.api.successRate);
            setError4xx(data.api.error4xx || MOCK_DATA.api.error4xx);
            setError5xx(data.api.error5xx || MOCK_DATA.api.error5xx);
          }
        } else {
          // Use mock data for standalone pages
          setTotalFeatures(MOCK_DATA.drift.totalFeatures);
          setdriftedFeatures(MOCK_DATA.drift.driftedFeatures);
          setRequestRate(MOCK_DATA.api.requestRate);
          setSuccessRate(MOCK_DATA.api.successRate);
          setError4xx(MOCK_DATA.api.error4xx);
          setError5xx(MOCK_DATA.api.error5xx);
        }
      } catch (err) {
        console.error("Monitoring data fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMonitoringData();
  }, [useCaseId, modelId, versionId]);

  // Subscribe to real-time monitoring updates (only for nested pages with numeric IDs)
  useEffect(() => {
    if (!useCaseId || !modelId || !versionId) return;

    // Only subscribe if we have actual numeric IDs
    if (isNaN(Number(useCaseId))) return;

    const unsubscribe = subscribeToAIStudioMonitoring(
      useCaseId,
      modelId,
      versionId,
      (update) => {
        // Update drift metrics
        if (update.drift) {
          setdriftedFeatures((prev) =>
            update.drift.driftedFeatures || prev
          );
        }

        // Update API metrics
        if (update.api) {
          if (update.api.requestRate) {
            setRequestRate(parseFloat(update.api.requestRate));
          }
          if (update.api.latency) {
            setAvgLatency(parseFloat(update.api.latency));
          }
        }
      }
    );

    return () => unsubscribe();
  }, [useCaseId, modelId, versionId]);

  const lines = useMemo(
    () => [
      { dataKey: "endToEnd", name: "End-to-End", color: "var(--red)" },
    ],
    []
  );

  return (
    <div className="w-full space-y-5">
      <div className="w-full py-3">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-medium mb-2">
              Data Drift Metrics
            </h1>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="!pb-0 !py-7">
              <CardContent className="!space-y-10">
                <div className="text-sm ">No. of features</div>
                <div className="text-4xl font-bold text-badge-green">
                  {isLoading ? (
                    <div className="h-10 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    totalFeatures
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="!pb-0 !py-7">
              <CardContent className="!space-y-10">
                <div className="text-sm ">No. of drifted features</div>
                <div className="text-4xl font-bold text-red">
                  {isLoading ? (
                    <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                  ) : (
                    driftedFeatures
                  )}
                </div>
              </CardContent>
            </Card>

          </div>

          <Card className="">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-xl font-medium">Dataset Drift</CardTitle>
              <Badge variant="outline" className="py-1 px-4 text-sm border-red fonr-medium">
                Drift detected at{" "}
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                })}
              </Badge>
            </CardHeader>

            <CardContent className="pt-4  flex items-center justify-center">
              <CustomBarChart
                live={true}
                timeKey="timeLabel"
                bars={[
                  {
                    dataKey: "driftedFeatures",
                    name: "Drifted Features",
                    color: "#FF050A",
                  }
                ]}
                height={300}
                width="90%"
                barCategoryGap="30%"
                barGap={6}
                showLegend={false}
                radius={[3, 3, 0, 0]}
                barSize={45}
                yAxisFormatter={(v) => Number(v).toFixed(0)}
                tooltipFormatter={(v, name) => [Number(v).toFixed(0), name]}
                makePoint={(now) => {
                  const driftedFeatures = clamp(
                    Math.round(220 + (Math.random() * 2 - 1) * 120),
                    50,
                    400
                  );
                  return {
                    time: now.getTime(),
                    timeLabel: now.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    }),
                    driftedFeatures,

                  };
                }}
                maxPoints={8}
                updateMs={3000}
              />
            </CardContent>
          </Card>
        </div>
      </div>


<div className="w-full py-3">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-medium mb-2">
            API Metrics
          </h1>
        
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-7">
              <div className="text-sm">Request Rate</div>
              <div className="text-2xl font-semibold">
                {isLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${Number(requestRate).toFixed(2)} ops/s`
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-7">
              <div className="text-sm">Success</div>
              <div className="text-2xl font-semibold">
                {isLoading ? (
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${Number(successRate).toFixed(2)} %`
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-7">
              <div className="text-sm">Error 4xxx</div>
              <div className="text-2xl font-semibold">
                {isLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${Number(error4xx).toFixed(2)} ops/s`
                )}
              </div>
            </CardContent>
          </Card>
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-7">
              <div className="text-sm">Error 5xxx</div>
              <div className="text-2xl font-semibold">
                {isLoading ? (
                  <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                ) : (
                  `${Number(error5xx).toFixed(2)} ops/s`
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="">
          <CardHeader>
            <CardTitle className="text-2xl">Latency</CardTitle>
          </CardHeader>

          <CardContent className="pt-4 flex items-center justify-center">
            <CustomLineChart
              live={true}
              timeKey="time"
              lines={lines}
              dotSize={0}
              height={280}
              width="90%"
              showLegend={false}
              yAxisDomain={[0, 2.5]}
              yAxisTicks={[0, 0.2, 0.5, 0.75, 1.0, 1.5, 2.0, 2.5]}
              yAxisFormatter={(v) => `${Number(v).toFixed(1)}s`}
              tooltipFormatter={(v, name) => [`${Number(v).toFixed(2)}s`, name]}
              makePoint={(now) => {
                const endToEnd = clamp(1.2 + Math.random() * 1.3, 1.2, 2.5);
                return {
                  time: now.getTime(),
                  endToEnd: +endToEnd.toFixed(2),
                };
              }}
              maxPoints={20}
              updateMs={3000}
            />
          </CardContent>
        </Card>
      </div>
    </div>
    </div>
  );
};

export default MonitoringView;
