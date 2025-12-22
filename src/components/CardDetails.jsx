"use client";

import CountUp from "./animations/CountUp";

/**
 * Component to display a list of card details.
 *
 * @param {Object} props - The component props.
 * @param {Array<{title: string, value: string|number, description?: string}>} [props.data=[]] - An array of data objects to display in cards.
 * @returns {React.JSX.Element} The rendered CardDetails component.
 */
export default function CardDetails({ data = [], first, textSize }) {
  return (
    <div className="w-full flex items-center justify-between gap-4">
      {data.map((item, index) => (
        <div
          key={index}
          className="flex flex-col gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
        >
          <span className="text-sm text-foreground/80">{item.title}</span>

          {item.description ? (
            <>
              <span className="text-2xl font-medium mt-1">
                {first ? `${item.value}` : <CountUp value={item.value} startOnView />}
          </span>
              <span className="text-sm font-normal">{item.description}</span>
            </>
          ) : (
            <span className={`${textSize ? textSize : "text-xl"} font-medium mt-2`}>{<CountUp value={item.value} startOnView />}</span>
          )}
        </div>
      ))}
    </div>
  );
}
