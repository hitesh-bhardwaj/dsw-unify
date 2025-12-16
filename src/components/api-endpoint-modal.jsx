"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import { Check, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Tabs from "./common/Tabs";
import CopyButton from "./animate-ui/components/buttons/CopyButton";

/**
 * Component for copying text to clipboard with a tooltip feedback.
 *
 * @param {Object} props - The component props.
 * @param {string} props.text - The text to copy.
 * @param {string} [props.className] - Additional class names for the button.
 * @param {string} [props.iconClassName] - Additional class names for the icon.
 * @param {string} [props.aria-label] - Aria label for the button.
 * @returns {React.JSX.Element} The rendered CopyWithTooltip component.
 */
function CopyWithTooltip({
  text,
  className = "",
  iconClassName = "h-4 w-4",
  "aria-label": ariaLabel,
}) {
  const [label, setLabel] = useState("Copy");
  const handleClick = () => {
    navigator.clipboard?.writeText?.(text).catch(() => { });
    setLabel("Copied");
  };
  return (
    <Tooltip onOpenChange={(o) => !o && setLabel("Copy")}>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          onClick={handleClick}
          className={`shrink-0 flex justify-center items-center cursor-pointer pr-0 py-5 px-5 min-w-8 bg-gray-100 rounded-lg border-foreground/20 ${className}`}
          aria-label={ariaLabel || label}
        >
          <Copy className={iconClassName} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}


const tabs = [

  {
    id: "curl",
    label: "cURL",
  },
  {
    id: "javascript",
    label: "Javascript",
  },
  {
    id: "python",
    label: "Python",
  },
];

/**
 * Modal for displaying API endpoint information and code examples.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.open - Whether the modal is open.
 * @param {function} props.onOpenChange - Callback function when the open state changes.
 * @param {string} [props.agentId="unnamed-agent"] - The ID of the agent.
 * @returns {React.JSX.Element} The rendered ApiEndpointModal component.
 */
export default function ApiEndpointModal({
  open,
  onOpenChange,
  agentId = "unnamed-agent",
}) {
  const agentApiBase =
    process.env.NEXT_PUBLIC_AGENT_API_BASE_URL || "https://api.example.com";
  const apiKey =
    process.env.NEXT_PUBLIC_AGENT_API_KEY || "sk-agent-placeholder";
  const endpointUrl = `${agentApiBase}/v1/agents/${agentId}/chat`;

  const codeExamples = {
    curl: `curl -X POST "${endpointUrl}" \\
  -H "Authorization: Bearer ${apiKey}..." \\
  -H "Content-Type: application/json" \\
  -d '{
    "message": "Hello, how can you help me?"
  }'`,
    javascript: `const response = await fetch("${endpointUrl}", {
  method: "POST",
  headers: {
    "Authorization": "Bearer ${apiKey}...",
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    message: "Hello, how can you help me?"
  })
});

const data = await response.json();
console.log(data);`,
    python: `import requests

url = "${endpointUrl}"
headers = {
    "Authorization": "Bearer ${apiKey}...",
    "Content-Type": "application/json"
}
data = {
    "message": "Hello, how can you help me?"
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`,
  };

  // --- Custom scrollbar wiring ---
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const [activeTab, setActiveTab] = useState("curl");
  const [displayedTab, setDisplayedTab] = useState("curl");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (value) => {
    if (value === activeTab) return;

    setIsTransitioning(true);
    setActiveTab(value);

    // Wait for fade out to complete, then change content and fade in
    setTimeout(() => {
      setDisplayedTab(value);
      setIsTransitioning(false);
    }, 300); // Match this to your transition duration (duration-300 = 300ms)
  };

  // Start at 0 so there's no fake size; we compute before first paint.
  const [thumbH, setThumbH] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const dragState = useRef({ dragging: false, startY: 0, startScrollTop: 0 });

  const clamp = (v, min, max) => Math.max(min, Math.min(max, v));

  const recalcThumb = useCallback(() => {
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const { clientHeight, scrollHeight, scrollTop } = el;
    const trackH = track.clientHeight;

    // Compute thumb height (min size for usability)
    const visibleRatio = clientHeight / scrollHeight || 0;
    const minThumb = 24; // you can tweak this if you want smaller/larger minimum
    const newThumbH = clamp(
      Math.round(trackH * visibleRatio),
      minThumb,
      trackH
    );
    setThumbH(newThumbH);

    // Compute thumb position
    const maxThumbTop = trackH - newThumbH;
    const scrollRatio =
      (scrollTop || 0) / Math.max(1, scrollHeight - clientHeight);
    const newTop = Math.round(maxThumbTop * scrollRatio);
    setThumbTop(clamp(newTop, 0, maxThumbTop));
  }, []);

  const onScroll = useCallback(() => {
    recalcThumb();
  }, [recalcThumb]);

  const startDrag = (e) => {
    e.preventDefault();
    dragState.current.dragging = true;
    dragState.current.startY =
      e.type === "touchstart" ? e.touches[0].clientY : e.clientY;
    dragState.current.startScrollTop = scrollRef.current?.scrollTop || 0;
    document.addEventListener("mousemove", onDrag);
    document.addEventListener("mouseup", endDrag);
    document.addEventListener("touchmove", onDrag, { passive: false });
    document.addEventListener("touchend", endDrag);
  };

  const onDrag = (e) => {
    if (!dragState.current.dragging) return;
    e.preventDefault();
    const el = scrollRef.current;
    const track = trackRef.current;
    if (!el || !track) return;

    const clientY = e.type === "touchmove" ? e.touches[0].clientY : e.clientY;
    const deltaY = clientY - dragState.current.startY;

    const trackH = track.clientHeight;
    const maxThumbTop = trackH - thumbH;

    // Map delta on track to scrollTop delta
    const maxScrollTop = el.scrollHeight - el.clientHeight;
    const scrollPerPixel = maxScrollTop / Math.max(1, maxThumbTop);
    el.scrollTop = clamp(
      dragState.current.startScrollTop + deltaY * scrollPerPixel,
      0,
      maxScrollTop
    );
  };

  const endDrag = () => {
    dragState.current.dragging = false;
    document.removeEventListener("mousemove", onDrag);
    document.removeEventListener("mouseup", endDrag);
    document.removeEventListener("touchmove", onDrag);
    document.removeEventListener("touchend", endDrag);
  };

  const onTrackClick = (e) => {
    // Jump scroll where clicked on the track (center the thumb)
    if (!trackRef.current || !scrollRef.current) return;
    if (thumbRef.current?.contains(e.target)) return; // ignore if clicking thumb

    const trackRect = trackRef.current.getBoundingClientRect();
    const clickY = e.clientY - trackRect.top;
    const targetTop = clamp(
      clickY - thumbH / 2,
      0,
      trackRef.current.clientHeight - thumbH
    );

    const el = scrollRef.current;
    const maxScrollTop = el.scrollHeight - el.clientHeight;
    const maxThumbTop = trackRef.current.clientHeight - thumbH;
    const ratio = maxThumbTop ? targetTop / maxThumbTop : 0;

    el.scrollTop = Math.round(maxScrollTop * ratio);
  };

  // Recalculate BEFORE first paint to avoid the "24px → real size" flash
  useLayoutEffect(() => {
    recalcThumb();
    const el = scrollRef.current;

    const onResize = () => recalcThumb();
    window.addEventListener("resize", onResize);

    // Observe content size changes
    let ro;
    if ("ResizeObserver" in window && el) {
      ro = new ResizeObserver(recalcThumb);
      ro.observe(el);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      ro?.disconnect();
      endDrag();
    };
  }, [recalcThumb]);

  // Also keep it in sync during normal lifecycle updates (e.g. tab switches)
  useEffect(() => {
    recalcThumb();
  }, [open, recalcThumb]);

  const [copiedText, setCopiedText] = useState(null);
  const [copied, setCopied] = useState(false);


const handleCopy = async (textToCopy) => {
  try {
    await navigator.clipboard.writeText(textToCopy);
    setCopiedText(textToCopy);
    setCopied(true);
    setTimeout(() => {
      setCopiedText(null);
    setCopied(false);

    }, 1500);
  } catch (err) {
    console.error('Failed to copy:', err);
  }
};

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={"w-[60%] left-1/2 -translate-x-1/2 top-1/2 h-[80%]"}
      >
        <TooltipProvider delayDuration={200}>
          {/* Scrollable content */}
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="overflow-hidden w-full h-full relative overflow-y-scroll customScrollbar"
          >
            <div className="py-4 px-2 pr-8 w-full">
              <DialogHeader>
                <DialogTitle className="text-2xl font-medium">
                  API Endpoint
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6 py-8">
                {/* Agent ID and Status */}
                <div className="flex w-full h-fit gap-15">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm text-foreground">Agent ID</label>
                    <div className="flex gap-2 w-full">
                      <Input
                        value={agentId}
                        readOnly
                        className="border border-foreground/20"
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={() => handleCopy(agentId)}
                              className="p-3 cursor-pointer text-icon-color-2 bg-icon-color-2/10 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
                            >
                              {copiedText === agentId ? (
                                <Check className="w-5 h-5 text-icon-color-2" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{copied ? "Copied!" : "Copy"}</p>
                          </TooltipContent>

                        </Tooltip>
                      </TooltipProvider>


                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm text-foreground">Status</label>
                    <div>
                      <Badge className="border border-badge-green rounded-lg px-7 py-3 bg-transparent text-foreground">
                        Active
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* API Key */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-foreground">API Key</label>
                  <div className="flex gap-2">
                    <Input
                      value={apiKey}
                      readOnly
                      className="border border-foreground/20"
                    />


                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleCopy(apiKey)}
                            className="p-3 cursor-pointer text-icon-color-2 bg-icon-color-2/10 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
                          >
                            {copiedText === apiKey ? (
                              <Check className="w-5 h-5 text-icon-color-2" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copied ? "Copied!" : "Copy"}</p>
                        </TooltipContent>

                      </Tooltip>
                    </TooltipProvider>

                  </div>
                  <p className="text-xs text-black/60">
                    *Keep your API key secure and don't share it publicly
                  </p>
                </div>

                {/* Endpoint URL */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-sm text-foreground">
                    Endpoint URL
                  </label>
                  <div className="flex gap-2">
                    <Input
                      value={endpointUrl}
                      readOnly
                      className="border border-foreground/20"
                    />


                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={() => handleCopy(endpointUrl)}
                            className="p-3 cursor-pointer text-icon-color-2 bg-icon-color-2/10 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
                          >
                            {copiedText === endpointUrl ? (
                              <Check className="w-5 h-5 text-icon-color-2" />
                            ) : (
                              <Copy className="w-5 h-5" />
                            )}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{copied ? "Copied!" : "Copy"}</p>
                        </TooltipContent>

                      </Tooltip>
                    </TooltipProvider>

                  </div>
                </div>

                {/* Code Examples */}
                <div className="space-y-3">
                  <h3 className="text-xl font-medium">Code Examples</h3>
                  <Tabs tabs={tabs} value={activeTab} onValueChange={handleTabChange} />

                  <div className="mt-4 border rounded-xl overflow-hidden w-full">
                    <div className="relative">
                      <pre
                        className={`rounded-lg bg-background p-4 text-sm text-foreground overflow-x-auto transition-opacity duration-300 ease-in ${isTransitioning ? 'opacity-0' : 'opacity-100'
                          }`}
                      >
                        <code>{codeExamples[displayedTab]}</code>
                      </pre>
                      <div className="absolute right-2 top-2">


                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                onClick={() => handleCopy(codeExamples[displayedTab])}
                                className="p-3 cursor-pointer text-icon-color-2 bg-icon-color-2/10 rounded-lg transition duration-200 ease-in-out flex items-center justify-center"
                              >
                                {copiedText === codeExamples[displayedTab] ?(
                                  <Check className="w-5 h-5 text-icon-color-2" />
                                ) : (
                                  <Copy className="w-5 h-5" />
                                )}
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{copied ? "Copied!" : "Copy"}</p>
                            </TooltipContent>

                          </Tooltip>
                        </TooltipProvider>

                      </div>
                    </div>
                  </div>      </div>
              </div>
            </div>
          </div>

          {/* Custom scroll track + thumb */}
          <div
            ref={trackRef}
            onMouseDown={onTrackClick}
            className="absolute w-1 rounded-full bg-black/15 h-[75%] right-[4%] top-[17%] scroll-track dark:bg-sidebar-accent"
          >
            <div
              ref={thumbRef}
              onMouseDown={startDrag}
              onTouchStart={startDrag}
              className="scroll-thumb w-1 bg-primary rounded-full cursor-pointer"
              style={{
                height: `${thumbH || 0}px`,
                transform: `translateY(${thumbTop}px)`,
                willChange: "transform",
                // Hide until we've measured (prevents initial flash of wrong size)
                opacity: thumbH ? 1 : 0,
              }}
            />
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}
