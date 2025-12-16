import React from "react";
import { TestingCardResults } from "./testing-card-results";
import EmptyCard from "../common/EmptyCard";

const TestingResultsGrid = ({ items , handleDeleteTest}) => {
  if (!items.length) {
    return (
      <>
      <EmptyCard children={`No test results yet`}/>
      </>
    );
  }

  return (
    <div className="flex-1 h-full w-full relative space-y-4">
      {items.map((item) => (
        <TestingCardResults key={item.id} test={item}  onDeleteTest={handleDeleteTest}/>
      ))}
    </div>
  );
};

export default TestingResultsGrid;
