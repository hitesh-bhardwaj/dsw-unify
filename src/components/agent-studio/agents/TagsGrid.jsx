'use client'
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {  PlusIcon } from "@/components/Icons";
import Link from "next/link";
import { RippleButton } from "@/components/ui/ripple-button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

/**
 * Component to display a grid of prompt cards with search and generation functionality.
 *
 * @returns {React.JSX.Element} The rendered PromptCardGrid component.
 */
const TagsGrid = () => {
     const [tags, setTags] = useState([]);
  const [key, setKey] = useState('');
  const [value, setValue] = useState('');

  const handleAddTag = () => {
    if (key.trim() && value.trim()) {
      setTags([...tags, { key: key.trim(), value: value.trim(), id: Date.now() }]);
      setKey('');
      setValue('');
    }
  };

  const handleRemoveTag = (id) => {
    setTags(tags.filter(tag => tag.id !== id));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTag();
    }
  };
  return (
    <>
      <Card className="space-y-6 border rounded-3xl p-6 px-0 border-border-color-0 h-fit pb-8 ">
        <CardHeader className="flex justify-between w-full">
    <div>
        <h3 className="text-xl font-medium mb-2">Tags</h3>
        <p className="text-sm text-gray-600 mb-4 dark:text-foreground">
         Add key-value pair tags for organization and discovery
        </p>
    </div>
   
        </CardHeader>
<CardContent >
      <div className="flex gap-4 items-start">
          <Input
            type="text"
            placeholder="key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            onKeyPress={handleKeyPress}
          />
          <Input
            type="text"
            placeholder="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={handleKeyPress}
          />

           <Link href="#" onClick={handleAddTag}
            disabled={!key.trim() || !value.trim()}>
              <RippleButton>
                <Button  variant="outline" className=" gap-2 text-foreground border border-primary !px-5 !py-0.8 !h-10">
                  <PlusIcon  className="text-primary"/>
                 Add Tags
                </Button>
              </RippleButton>
            </Link>
        </div>

        {tags.length > 0 && (
          <div className="pt-4">
            <h4 className="text-sm font-medium mb-3 text-gray-700 dark:text-gray-300">
              Created Tags ({tags.length})
            </h4>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag.id}
                  className="inline-flex items-center gap-2 px-3 py-1.5 bg-sidebar-accent border border-border-color-0 rounded-lg group"
                >
                  <span className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{tag.key}:</span>{' '}
                    <span className="text-gray-700 dark:text-gray-300">{tag.value}</span>
                  </span>
                  <button
                    onClick={() => handleRemoveTag(tag.id)}
                    className="text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    aria-label="Remove tag"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
               </div>
          </div>
        )}

          </CardContent>
       
      </Card>
    </>
  );
};

export default TagsGrid;
