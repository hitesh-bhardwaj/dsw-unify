import React, { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {  PlusIcon } from "@/components/Icons";
import Link from "next/link";
import { RippleButton } from "@/components/ui/ripple-button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Check } from "lucide-react";
import CreateGuardSuitesModal from "../guardrails/CreateGuardSuitesModal";

/**
 * Component to display a grid of prompt cards with search and generation functionality.
 *
 * @returns {React.JSX.Element} The rendered PromptCardGrid component.
 */
const GuardrailsGrid = () => {
const [useCase, setUseCase] = useState("");
const cardRef = useRef(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);


  useEffect(() => {
    if (useCase === "Production Safety Suite" && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [useCase]);
const useCases = [
  { id: 1, label: "Production Safety Suite" },
  { id: 2, label: "Suite 2" },
  { id: 3, label: "Suite 3" },
];
 const inputGuardrails = [
    'Jailbreak & Unsafe Prompt',
    'Toxic Language',
    'Sensitive Information'
  ];

  const outputGuardrails = [
    'Hallucination/Correctness',
    'Sensitive Information'
  ];
  
  return (
    <>
      <Card className="space-y-6 border rounded-3xl p-6 px-0 border-border-color-0 h-fit pb-8 ">
        <CardHeader className="flex justify-between w-full">
    <div>
        <h3 className="text-xl font-medium mb-2">Guardrails Configuration</h3>
        <p className="text-sm text-gray-600 mb-4 dark:text-foreground">
          Configure guard suites to ensure safe and compliant agent behavior
        </p>
    </div>
    <Link href="/agent-studio/agents/create">
              <RippleButton>
                <Button onClick={() => setOpenCreateModal(true)} variant="outline" className=" gap-2 text-foreground border border-primary !px-5 !py-0.8 !h-10">
                  <PlusIcon  className="text-primary"/>
                  Create Guard Suite
                </Button>
              </RippleButton>
            </Link>
        </CardHeader>
<CardContent>
         <div className="space-y-1">
            <label className="text-sm mb-2 block">Select Guard Suite</label>
              <Select onValueChange={(val) => setUseCase(val)} className="py-2">
                <SelectTrigger className="w-full py-5 cursor-pointer dark:bg-card border border-border-color-0">
                  <SelectValue placeholder="Select a model" className="text-foreground/80" />
                </SelectTrigger>
                <SelectContent  className="border border-border-color-0">
                  {useCases.map((item) => (
                    <SelectItem key={item.id} value={item.label} className="cursor-pointer">
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>

          {useCase === "Production Safety Suite" && (
        <Card ref={cardRef} className="mt-7">
            <CardHeader>
                <div>
        <h4 className="text-md font-medium">Production Safety Suite</h4>
        <p className="text-sm text-gray-600 mb-2 dark:text-foreground">
          Comprehensive safety checks for production agents
        </p>
    </div>
            </CardHeader>

            <CardContent>
                 <div className="">
      <div className="grid grid-cols-2 gap-12">
        {/* Left Column - Input Guardrails */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-5 rounded-full  border border-badge-blue flex items-center justify-center">
              <ArrowDown className="w-3 h-3 text-badge-blue" />
            </div>
            <h2 className="text-sm font-semibold">Input Guardrails</h2>
          </div>
          
          <div className="space-y-3">
            {inputGuardrails.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full  border border-badge-green flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-3 h-3 text-badge-green" />
                </div>
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Right Column - Output Guardrails */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-5 rounded-full  flex items-center justify-center border border-badge-green">
              <ArrowUp className="w-3 h-3 text-badge-green" />
            </div>
            <h2 className="text-sm font-semibold">Output Guardrails</h2>
          </div>
          
          <div className="space-y-3">
            {outputGuardrails.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5  border border-badge-green">
                  <Check className="w-3 h-3 text-badge-green" />
                </div>
                <span className="text-sm font-semibold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
            </CardContent>

        </Card>
          )}

          </CardContent>
       
      </Card>
       <CreateGuardSuitesModal
        open={openCreateModal}
        onOpenChange={setOpenCreateModal}
      />
      
    </>
  );
};

export default GuardrailsGrid;
