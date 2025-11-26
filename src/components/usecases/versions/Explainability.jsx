"use client";

import AnimatedProgressBar from "@/components/animations/ProgressBar";

export default function Explainability() {
  const data = [
    { label: "Age", value: 100 },
    { label: "Income", value: 85 },
    { label: "Credit Score", value: 70 },
    { label: "Account Balance", value: 55 },
    { label: "Transaction Frequency", value: 40 },
  ];

  return (
    <div className="p-5 border border-border-color-2 rounded-2xl space-y-8">

        <h2 className="text-xl font-medium">Feature Importance</h2>

    <div className="w-full space-y-4">
      {data.map((item, index) => (
        <div key={index} className="space-y-1.5">
       
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-foreground/80">{item.label}</span>
            <span className="text-foreground/80">
              {item.value}%
            </span>
          </div>

          {/* Progress Bar */}
          <AnimatedProgressBar
            value={item.value}
            duration={1.2}
            ease="easeInOut"
            animateOnMount
            playKey={item.value} 
            className="w-full"
            trackClassName="w-full bg-gray-200 h-2 rounded-full relative overflow-hidden"
            barClassName="bg-[#FF6A00] h-full absolute top-0 left-0 z-[5] rounded-full"
          />
        </div>
      ))}
    </div>
    </div>

  );
}
