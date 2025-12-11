"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RippleButton } from "@/components/ui/ripple-button";
import { LeftArrow } from "@/components/Icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus } from "lucide-react";

export default function DefineJoins({ goNext, goBack, isLastStep, stepId }) {
  // JOINS STATE
  const [joins, setJoins] = useState([
    {
      id: 1,
      leftTable: "",
      leftKey: "",
      rightTable: "",
      rightKey: "",
      joinType: "",
    },
  ]);

  // ERRORS
  const [errors, setErrors] = useState({});

  const addJoin = () => {
    const newJoin = {
      id: joins.length + 1,
      leftTable: "",
      leftKey: "",
      rightTable: "",
      rightKey: "",
      joinType: "",
    };
    setJoins([...joins, newJoin]);
  };

  const removeJoin = (id) => {
    if (joins.length > 1) {
      setJoins(joins.filter((join) => join.id !== id));
    }
  };

  const updateJoin = (id, field, value) => {
    setJoins(
      joins.map((join) =>
        join.id === id ? { ...join, [field]: value } : join
      )
    );
  };

  const validate = () => {
    let valid = true;
    let newErrors = {};

    joins.forEach((join) => {
      if (!join.leftTable || !join.leftKey || !join.rightTable || !join.rightKey || !join.joinType) {
        newErrors[join.id] = "All fields are required for each join";
        valid = false;
      }
    });

    setErrors(newErrors);
    return valid;
  };

  const handleNext = () => {
    if (!validate()) return;
    goNext();
  };

  return (
    <div className="space-y-2 pb-10 pr-2">
      {/* TITLE */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-medium text-foreground">Define Joins</h2>
          <p className="text-xs text-foreground/80">
            Configure how tables should be joined together
          </p>
        </div>
        <RippleButton>
          <Button
            variant="outline"
            className="gap-2 border-primary text-foreground !h-10 !px-5 "
            onClick={addJoin}
          >
            <div className="text-primary">

            <Plus className="w-5 h-5" />
            </div>
            Add Join
          </Button>
        </RippleButton>
      </div>

      {/* JOINS LIST */}
      <div className="space-y-4 pt-4">
        {joins.map((join, index) => (
          <div
            key={join.id}
            className="border border-border-color-0 rounded-lg p-6 space-y-4 relative"
          >
            {/* Header with delete button */}
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-foreground">
                Join {index + 1}
              </h3>
              {joins.length > 0 && (
                <button
                  onClick={() => removeJoin(join.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Join Configuration Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Left Table */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">Left Table</label>
                <Select
                  value={join.leftTable}
                  className='space-y-2'
                  onValueChange={(value) =>
                    updateJoin(join.id, "leftTable", value)
                  }
                >
                  <SelectTrigger className="h-11 border-border-color-0 w-full">
                    <SelectValue className='placeholder:text-xs' placeholder="Select Column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className='cursor-pointer' value="transactions">Transactions</SelectItem>
                    <SelectItem className='cursor-pointer' value="users">Users</SelectItem>
                    <SelectItem className='cursor-pointer' value="products">Products</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Left Key */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">Left Key</label>
                <Select
                  value={join.leftKey}
                  onValueChange={(value) =>
                    updateJoin(join.id, "leftKey", value)
                  }
                >
                  <SelectTrigger className="h-11 border-border-color-0 w-full ">
                    <SelectValue className='placeholder:text-xs' placeholder="Select Column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className='cursor-pointer' value="id">ID</SelectItem>
                    <SelectItem className='cursor-pointer' value="user_id">User ID</SelectItem>
                    <SelectItem className='cursor-pointer' value="transaction_id">Transaction ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Join Type */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">Join Type</label>
                <Select
                  value={join.joinType}
                  onValueChange={(value) =>
                    updateJoin(join.id, "joinType", value)
                  }
                >
                  <SelectTrigger className="h-11 border-border-color-0 w-full">
                    <SelectValue className='placeholder:text-xs' placeholder="Select Column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem classname='cursor-pointer' value="inner">Inner</SelectItem>
                    <SelectItem classname='cursor-pointer' value="left">Left</SelectItem>
                    <SelectItem classname='cursor-pointer' value="right">Right</SelectItem>
                    <SelectItem classname='cursor-pointer' value="full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-3 gap-4">
              {/* Right Table */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">Right Table</label>
                <Select
                  value={join.rightTable}
                  onValueChange={(value) =>
                    updateJoin(join.id, "rightTable", value)
                  }
                >
                  <SelectTrigger className="h-11 border-border-color-0 w-full">
                    <SelectValue className='placeholder:text-xs' placeholder="Select Column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem classname='cursor-pointer' value="user_events">User_events</SelectItem>
                    <SelectItem classname='cursor-pointer' value="orders">Orders</SelectItem>
                    <SelectItem classname='cursor-pointer' value="payments">Payments</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Right Key */}
              <div className="space-y-2">
                <label className="text-xs text-foreground">Right Key</label>
                <Select
                  value={join.rightKey}
                  onValueChange={(value) =>
                    updateJoin(join.id, "rightKey", value)
                  }
                >
                  <SelectTrigger className="h-11 border-border-color-0 w-full">
                    <SelectValue className='placeholder:text-xs' placeholder="Select Column" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem classname='cursor-pointer' value="id">ID</SelectItem>
                    <SelectItem classname='cursor-pointer' value="user_id">User ID</SelectItem>
                    <SelectItem classname='cursor-pointer' value="event_id">Event ID</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Error message */}
            {errors[join.id] && (
              <p className="text-xs text-red-500 mt-2">{errors[join.id]}</p>
            )}
          </div>
        ))}
      </div>

      {/* FOOTER BUTTONS */}
      <div className="w-full flex justify-end gap-2 pt-4">
        <RippleButton>
          <Button
            variant="outline"
            className="gap-2 border-border-color-0 text-foreground hover:bg-gray-50 w-fit px-7"
            onClick={goBack}
          >
            Back
          </Button>
        </RippleButton>

        <RippleButton>
          <Button
            className="bg-sidebar-primary hover:bg-primary text-white gap-3 rounded-full px-6 py-6 cursor-pointer duration-300"
            onClick={handleNext}
          >
            Next Step
            <div className="w-4 h-auto">
              <LeftArrow className="rotate-180" />
            </div>
          </Button>
        </RippleButton>
      </div>
    </div>
  );
}