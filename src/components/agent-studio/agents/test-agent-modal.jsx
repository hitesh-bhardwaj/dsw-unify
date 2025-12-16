"use client";

import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  TooltipProvider
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, X } from "lucide-react";
import { UploadIcon } from "@/components/Icons";

export default function TestAgentModal({
  open,
  onOpenChange,
  agentId = "unnamed-agent",
}) {
  // --- Custom scrollbar wiring ---
  const scrollRef = useRef(null);
  const trackRef = useRef(null);
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

    const visibleRatio = clientHeight / scrollHeight || 0;
    const minThumb = 24;
    const newThumbH = clamp(
      Math.round(trackH * visibleRatio),
      minThumb,
      trackH
    );
    setThumbH(newThumbH);

    const maxThumbTop = trackH - newThumbH;
    const scrollRatio =
      (scrollTop || 0) / Math.max(1, scrollHeight - clientHeight);
    const newTop = Math.round(maxThumbTop * scrollRatio);
    setThumbTop(clamp(newTop, 0, maxThumbTop));
  }, []);

  const onScroll = useCallback(() => {
    recalcThumb();
  }, [recalcThumb]);

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

  useLayoutEffect(() => {
    recalcThumb();
    const el = scrollRef.current;

    const onResize = () => recalcThumb();
    window.addEventListener("resize", onResize);

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

  useEffect(() => {
    recalcThumb();
  }, [open, recalcThumb]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI agent. How can I help you today?",
      sender: 'bot',
      timestamp: '17:05:20'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputValue,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit', 
          second: '2-digit' 
        })
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      console.log('Selected files:', files);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} className=" overflow-hidden">
      <DialogContent
        className="w-3/5 h-[70%]  rounded-3xl flex flex-col p-0 gap-0 overflow-hidden"
      >
        
        <TooltipProvider delayDuration={200}>
          <div className="flex flex-col h-full overflow-hidden">
            {/* Header */}
            <div className="w-[95%] mt-6">

            <DialogHeader className="justify-center  bg-background">

            <div className="flex items-center  bg-background justify-between px-8 py-6 dark:bg-transparent">
               <DialogTitle className="text-2xl font-medium">
                Test Agent: Unnamed Agent
              </DialogTitle>
            </div>
            </DialogHeader>

            </div>
            <div className="w-[95%] h-[1px] bg-border-color-0 mx-auto" />

            {/* Messages Container */}
            <div
              ref={scrollRef}
              onScroll={onScroll}
              className="flex-1 overflow-y-auto px-8 py-8 space-y-6 bg-white customScrollbar dark:bg-transparent"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start gap-4 max-w-3xl">
                    {message.sender === 'bot' && (
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-white" />
                      </div>
                    )}
                    <div className="flex flex-col">
                    <div className="bg-white border border-border-color-0 rounded-lg px-6 py-4 dark:bg-sidebar-accent ">
                      <p className="text-xs text-gray-900 dark:text-foreground">{message.text}</p>
                     
                    </div>
                     <p className="text-xs text-foreground/80 ml-1 mt-1">{message.timestamp}</p>
                      </div>
                    {message.sender === 'user' && (
                      <div className="w-10 h-10 rounded-full border border-border-color-0 bg-white flex items-center justify-center flex-shrink-0 dark:bg-transparent">
                        <User className="w-5 h-5 text-gray-700 " />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-[95%] h-[1px] bg-border-color-0 mx-auto" />

            {/* Input Area - Fixed at bottom */}
            <div className="bg-white border-none px-8 py-6 dark:bg-transparent">
              <div className="flex items-center gap-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                  multiple
                />
                
                <div className="flex-1 relative">
                  <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="w-full px-6 py-3 border border-border-color-0 rounded-xl text-base "
                  />
                </div>
                
                <Button 
                  onClick={handleFileUpload}
                  variant="outline"
                  size="icon"
                  className="h-11.5 w-11.5 flex items-center justify-center rounded-md border-border-color-0 p-2.5"
                >
                  <UploadIcon className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  size="icon"
                  className={`h-11.5 w-15 rounded-md flex items-center justify-center  ${
                    inputValue.trim()
                      ? 'bg-primary '
                      : 'bg-primary/80 cursor-not-allowed '
                  }`}
                >
                  <Send className="w-10 h-10 text-white rotate-45 -ml-1.5" />
                </Button>
              </div>
            </div>
          </div>
        </TooltipProvider>
      </DialogContent>
    </Dialog>
  );
}