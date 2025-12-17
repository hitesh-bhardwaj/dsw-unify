"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ConnectorLine, MergeConnector, RelationalVectorDataIcon, SplitConnector } from "@/components/Icons";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

// Sample data - replace with your actual data
const pipelineData = {
  nodes: [
    {
      title: "Customer Database",
      subtitle: "External Sources",
      details: {
        "Source Type": "PostgreSQL",
        "Database": "customer_analytics",
        "Host": "prod-db.company.com",
        "Tables": ["customers", "transactions", "demographics"],
        "Last Sync": "2025-01-15 14:30:00"
      }
    },
    {
      title: "Customer Data Pipeline",
      subtitle: "Data Ingestion",
      details: {
        "Pipeline Type": "Batch ETL",
        "Schedule": "Daily at 2:00 AM",
        "Records processed":"2.5M",
        "Status": "Active",
        "Last Run": "2025-01-15 02:00:00",
      }
    },
    {
      title: "Aggregate Customer Metrics",
      subtitle: "Transformations",
      details: {
        "Transformation Type": "SQL Aggregation",
        "Operations": ["SUM", "AVG", "COUNT", "MAX"],
        "Output Features": ["total_spend", "avg_order_value", "purchase_frequency"],
      }
    },
    {
      title: "Behavioral Feature Engineering",
      subtitle: "Transformations",
      details: {
        "Transformation Type": "Window Functions",
        "Operations": ["LAG", "LEAD", "RUNNING_SUM"],
        "Output Features": ["days_since_last_purchase", "purchase_trend", "engagement_score"],
      }
    },
    {
      title: "Customer Analytics Features",
      subtitle: "Feature Views",
      details: {
        "Feature Count": "15",
        "Entity": "customer_id",
        "Features": ["total_spend", "avg_order_value", "purchase_frequency","engagement_score","churn_risk"],
        "Freshness": "< 24 hours",
        "Status": "Active",
      }
    },
    {
      title: "Churn Prediction Features",
      subtitle: "Feature Services",
      details: {
        "Service Type": "Online Feature Service",
        "Features Exposed":"12",
        "Avg Latency":"15ms",
        "Requests Per Day":"500K",
        "Status":"Healthy"
      }
    },
    {
      title: "Customer Churn Predictor v2.1",
      subtitle: "ML Models",
      details: {
        "Model Type": "XGBoost Classifier",
        "Accuracy": "94.2%",
        "Precision": "91.5%",
        "Recall": "88.3%",
        "Training Data":"2025-01-10",
        "Features Used": "12",
        "Deployment Status": "Production",
        "Endpoint": "/api/v1/predict/churn"
      }
    }
  ]
};

export default function Lineage() {
  return (
    <div className="border border-border-color-0 rounded-2xl space-y-8 py-6 pb-8 px-8">
      <div className="space-y-3">
        <h2 className="text-xl font-medium">Data Lineage</h2>
        <p className="text-sm text-foreground/80">
          Complete traceability from source data to deployed model
        </p>
      </div>
      <CustomerPipelineDiagram />
    </div>
  );
}

const PipelineNode = ({ title, subtitle, details, index }) => {
  const [open, setOpen] = useState(false);

  const renderValue = (value) => {
    // Badge
    if (value?.badge) {
      return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">{value.value}</span>;
    }
    
    // Simple array
    if (Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-2 mt-2">
          {value.map((item, i) => (
            <span key={i} className="px-3 py-1 rounded-full border text-xs">{item}</span>
          ))}
        </div>
      );
    }
    
    // Regular text
    return <p className="font-medium">{value}</p>;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Card 
          className="w-72 cursor-pointer transition-all !py-6 border border-red-500"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          style={{
             borderColor: open ? `var(--icon-color-${(index % 4) + 1})` : 'var(--border-color-0)'
          }}
        >
          <CardHeader className="gap-4">
            <div className="flex items-end gap-3 mb-2">
              <div className="w-15 h-15 rounded-lg bg-sidebar-accent p-3 flex items-center justify-center "
               style={{
                color: `var(--icon-color-${(index % 4) + 1})`,
                backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`,
               
              }}
>
                <RelationalVectorDataIcon className="w-7 h-7"/>
              </div>
              <span className="text-xs border px-3 py-1 rounded-full text-forground/60">
                {subtitle}
              </span>
            </div>
            <h3 className="text-xl font-medium">{title}</h3>
          </CardHeader>
        </Card>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        side="bottom"
        sideOffset={16}
        className="w-88 rounded-3xl p-6 py-4 shadow-md border border-border-color-0"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="space-y-6">
          <h2 className="text-xl font-medium">{title}</h2>
          <div className="space-y-3">
            {details && Object.entries(details).map(([label, value]) => 
              value && (
                <div key={label}>
                  <p className="text-foreground/80 text-xs">{label}</p>
                  {renderValue(value)}
                </div>
              )
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

function CustomerPipelineDiagram() {
  const [n1, n2, n3, n4, n5, n6, n7] = pipelineData.nodes;

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col items-center">
          <PipelineNode title={n1.title} subtitle={n1.subtitle} details={n1.details} index={0} />
          <ConnectorLine/>
          <PipelineNode title={n2.title} subtitle={n2.subtitle} details={n2.details} index={1} />
          <SplitConnector/>
          <div className="flex gap-24 ">
            <PipelineNode title={n3.title} subtitle={n3.subtitle} details={n3.details} index={2} />
            <PipelineNode title={n4.title} subtitle={n4.subtitle} details={n4.details} index={3} />
          </div>
          <MergeConnector/>
          <PipelineNode title={n5.title} subtitle={n5.subtitle} details={n5.details} index={4} />
          <ConnectorLine />
          <PipelineNode title={n6.title} subtitle={n6.subtitle} details={n6.details} index={5} />
          <ConnectorLine />
          <PipelineNode title={n7.title} subtitle={n7.subtitle} details={n7.details} index={6} />
        </div>
      </div>
    </div>
  );
}