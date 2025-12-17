import React, { useEffect, useMemo, useState } from "react";
import { Bar, BarChart } from "recharts";
import CountUp from "../animations/CountUp";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { CustomBarChart, CustomLineChart } from "../common/Graphs/graphs";
import { Badge } from "../ui/badge";

const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
const MonitoringView = () => {
  const [driftedFeatures, setdriftedFeatures] = useState(156);
  const [postInference, setPostInference] = useState(43);
  const [avgLatency, setAvgLatency] = useState(0.112);

  // Update KPIs every 3s (same cadence as chart)
  useEffect(() => {
    const id = setInterval(() => {
      setdriftedFeatures((prev) =>
        clamp(prev + (Math.floor(Math.random() * 40) - 20), 50, 300)
      );
      setPostInference((prev) =>
        clamp(prev + (Math.floor(Math.random() * 20) - 10), 20, 150)
      );
      setAvgLatency((prev) =>
        clamp(prev + (Math.random() * 0.02 - 0.01), 0.08, 0.2)
      );
    }, 3000);

    return () => clearInterval(id);
  }, []);

  const [endToEnd, setEndToEnd] = useState(1.85);
    const [processing, setProcessing] = useState(0.78);
    const [toolInvocation, setToolInvocation] = useState(0.42);
  
    // Update KPIs every 3s to match chart updates
    useEffect(() => {
      const id = setInterval(() => {
        const newEndToEnd = clamp(1.2 + Math.random() * 1.3, 1.2, 2.5);
        const newProcessing = clamp(0.4 + Math.random() * 0.8, 0.4, 1.2);
        const newToolInvocation = clamp(0.2 + Math.random() * 0.4, 0.2, 0.6);
  
        setEndToEnd(+newEndToEnd.toFixed(2));
        setProcessing(+newProcessing.toFixed(2));
        setToolInvocation(+newToolInvocation.toFixed(2));
      }, 3000);
  
      return () => clearInterval(id);
    }, []);
  
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
                  21
                </div>
              </CardContent>
            </Card>

            <Card className="!pb-0 !py-7">
              <CardContent className="!space-y-10">
                <div className="text-sm ">No. of drifted features</div>
                <div className="text-4xl font-bold text-red">{driftedFeatures}</div>

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
              <div className="text-2xl font-semibold">{Number(endToEnd).toFixed(2)} ops/s</div>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-7">
              <div className="text-sm">Success</div>
              <div className="text-2xl font-semibold">{Number(processing).toFixed(2)} %</div>
            </CardContent>
          </Card>

          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-7">
              <div className="text-sm">Error 4xxx</div>
              <div className="text-2xl font-semibold">
                {Number(toolInvocation).toFixed(2)} ops/s
              </div>
            </CardContent>
          </Card>
          <Card className="!pb-0 !py-7">
            <CardContent className="!space-y-7">
              <div className="text-sm">Error 5xxx</div>
              <div className="text-2xl font-semibold">
                {Number(toolInvocation).toFixed(2)} ops/s
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
