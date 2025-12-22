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
const [inputGuardrail, setInputGuardrail] = useState("");
const [outputGuardrail, setOutputGuardrail] = useState("");
const cardRef = useRef(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);


  useEffect(() => {
    if (inputGuardrail && cardRef.current) {
      setTimeout(() => {
        cardRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [inputGuardrail]);

  const guardrailsData=[
    {
      id: 1,
     label: "Production Safety Suite",
     para:"Comprehensive safety checks for production agents",
     inputGuardrails:[
    'Jailbreak & Unsafe Prompt',
    'Toxic Language',
    'Sensitive Information'
  ],
  outputGuardrails: [
    'Hallucination/Correctness',
    'Offensive Check'
  ]
    },
    {
      id: 2,
     label: "Content Moderation Suite",
     para:"Focused on toxic and offensive content detection",
     inputGuardrails:[
    'Toxic Language',
    'Word/Expression Check'
  ],
  outputGuardrails: [
    'Toxic Language',
    'Offensive Check'
  ]
    }
  ]
  
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
  <div className="space-y-8">
    {/* Input Guard Suite Section */}
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm mb-2 block">Input Guard Suite</label>
        <Select onValueChange={setInputGuardrail} className="py-2">
          <SelectTrigger className="w-full py-5 cursor-pointer dark:bg-card border border-border-color-0">
            <SelectValue placeholder="Choose an input guard suite" className="text-foreground/80" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            {guardrailsData.map((item) => (
              <SelectItem key={item.id} value={item.label} className="cursor-pointer">
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {inputGuardrail && (
        <Card ref={cardRef} className="mt-4">
          <CardHeader>
            <div>
              <h4 className="text-md font-medium">
                {guardrailsData.find(item => item.label === inputGuardrail)?.label}
              </h4>
              <p className="text-sm text-gray-600 mb-2 dark:text-foreground">
                {guardrailsData.find(item => item.label === inputGuardrail)?.para}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {/* Active Input Guardrails Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full border border-badge-blue flex items-center justify-center flex-shrink-0">
                  <ArrowDown className="w-3 h-3 text-badge-blue" />
                </div>
                <span className="text-sm font-semibold text-foreground">Active Input Guardrails</span>
              </div>

              {guardrailsData.find(item => item.label === inputGuardrail)?.inputGuardrails.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-badge-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-badge-green" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>

    {/* Output Guard Suite Section */}
    <div className="space-y-4">
      <div className="space-y-1">
        <label className="text-sm mb-2 block">Output Guard Suite</label>
        <Select onValueChange={setOutputGuardrail} className="py-2">
          <SelectTrigger className="w-full py-5 cursor-pointer dark:bg-card border border-border-color-0">
            <SelectValue placeholder="Choose an output guard suite" className="text-foreground/80" />
          </SelectTrigger>
          <SelectContent className="border border-border-color-0">
            {guardrailsData.map((item) => (
              <SelectItem key={item.id} value={item.label} className="cursor-pointer">
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {outputGuardrail && (
        <Card className="mt-4">
          <CardHeader>
            <div>
              <h4 className="text-md font-medium">
                {guardrailsData.find(item => item.label === outputGuardrail)?.label}
              </h4>
              <p className="text-sm text-gray-600  dark:text-foreground">
                {guardrailsData.find(item => item.label === outputGuardrail)?.para}
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="space-y-3">
              {/* Active Output Guardrails Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 rounded-full border border-badge-green flex items-center justify-center flex-shrink-0">
                  <ArrowUp className="w-3 h-3 text-badge-green" />
                </div>
                <span className="text-sm font-semibold text-foreground">Active Output Guardrails</span>
              </div>

              {guardrailsData.find(item => item.label === outputGuardrail)?.outputGuardrails.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full border border-badge-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3 h-3 text-badge-green" />
                  </div>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  </div>

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
