import React from "react";
import { TestingCard } from "./testing-card";

const TestingSuitesGrid = ({ items, onRunTest, onDeleteTest}) => {
  return (
    <div className="flex-1 h-full w-full relative space-y-4">
      {items.map((item) => (
        <TestingCard
          key={item.id}
          test={item}
          onRunTest={onRunTest}
          onDeleteTest={onDeleteTest}
        />
      ))}
    </div>
  );
};

export default TestingSuitesGrid;
