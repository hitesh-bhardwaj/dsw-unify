import { Copy, Check } from "lucide-react";
import { useState } from "react";

/**
 * Component to display and copy Python code examples.
 *
 * @param {Object} props - The component props.
 * @param {string} props.codeExamples - The Python code to display.
 * @returns {React.JSX.Element} The rendered PythonCodeBlock component.
 */
export default function PythonCodeBlock({ codeExamples }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full  dark:bg-background py-4 px-0 relative space-y-4 ">
      <p className=" text-xs">Python</p>

      <pre className="w-full whitespace-pre  dark:bg-background border-border-color-2 border overflow-x-auto rounded-lg text-foreground/80 py-6 px-4 text-xs font-mono">
        <code>{codeExamples}</code>
      </pre>

      <div className="w-full flex justify-end">
        <button
          onClick={handleCopy}
          className={`flex items-center w-fit gap-2 text-xs p-3 border border-primary rounded-full hover:bg-muted transition ${copied ? '': 'cursor-pointer'}`}
        >
          {copied ? (
              <Check className="w-5 h-5 text-green-600" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          {copied ? "Copied" : "Copy Code"}
        </button>
      </div>
    </div>
  );
}
