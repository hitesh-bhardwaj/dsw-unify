import { ConfirmDialog } from '@/components/common/Confirm-Dialog';
import { Bin, EditIcon, LeftArrow, MemoriesIcon, PlusIcon } from '@/components/Icons';
import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RippleButton } from '@/components/ui/ripple-button';
import { Separator } from '@/components/ui/separator';
import React, { useState, useMemo, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import EmptyCard from '@/components/common/EmptyCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

// Main Component
const AgentsMemoryGrid = ({ memories: initialMemories }) => {
    const [memories, setMemories] = useState(initialMemories);
    const [query, setQuery] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingMemory, setEditingMemory] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [memoryToDelete, setMemoryToDelete] = useState(null);
    const [selectedAgent, setSelectedAgent] = useState("");

    const filteredMemories = useMemo(() => {
        // First filter by selected agent
        let filtered = selectedAgent
            ? memories.filter(memory => memory.type === selectedAgent)
            : memories;

        // Then filter by search query
        if (query.trim()) {
            const searchTerm = query.toLowerCase();
            filtered = filtered.filter(memory =>
                memory.content?.toLowerCase().includes(searchTerm) ||
                memory.modified?.toLowerCase().includes(searchTerm)
            );
        }

        return filtered;
    }, [memories, query, selectedAgent]);

    const handleAddMemory = () => {
        setEditingMemory(null);
        setIsModalOpen(true);
    };

    const handleEditMemory = (memory) => {
        setEditingMemory(memory);
        setIsModalOpen(true);
    };

    const handleSaveMemory = (savedMemory) => {
        if (editingMemory) {
            setMemories(memories.map(m => m.id === savedMemory.id ? savedMemory : m));
        } else {
            const newMemory = {
                ...savedMemory,
                id: Date.now(),
                icon: <MemoriesIcon />
            };
            setMemories([...memories, newMemory]);
        }
    };

    const handleTrashClick = (e, memoryId) => {
        e.preventDefault();
        e.stopPropagation();
        setMemoryToDelete(memoryId);
        setIsDeleteOpen(true);
    };

    const handleDeleteMemory = () => {
        if (memoryToDelete) {
            setMemories(prevMemories => prevMemories.filter(m => m.id !== memoryToDelete));
            setMemoryToDelete(null);
        }
        setIsDeleteOpen(false);
    };

    const cn = (...classes) => classes.filter(Boolean).join(' ');

    return (
        <>
            <div className="space-y-6 pb-10">
                {/* Agent Selection Dropdown */}
                <div className='flex items-center gap-3 w-full'>
                    <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                        <SelectTrigger
                            className="w-100 !h-12 border border-border-color-0  bg-white dark:bg-card rounded-lg cursor-pointer"
                            aria-label="Select an agent"
                        >
                            <SelectValue placeholder="Choose an Agent to view memories" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl border border-border-color-0">
                            <SelectItem value="auto-claims-processing-agent" className="rounded-lg cursor-pointer">
                                Auto Claims Processing Agent
                            </SelectItem>
                            <SelectItem value="property-claims-agent" className="rounded-lg cursor-pointer">
                                Property Claims Agent
                            </SelectItem>
                            <SelectItem value="health-claims-adjudication-agent" className="rounded-lg cursor-pointer">
                                Health Claims Adjudication Agent
                            </SelectItem>
                            <SelectItem value="customer-support-agent" className="rounded-lg cursor-pointer">
                                Customer Support Agent
                            </SelectItem>
                            <SelectItem value="fraud-detection-agent" className="rounded-lg cursor-pointer">
                                Fraud Detection Agent
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Conditional Rendering based on agent selection */}
                {!selectedAgent ? (
                    <EmptyCard children={"Choose an agent from the dropdown to view and manage their memories"} />
                ) : (
                    <>
                        {/* Search Bar and Add Memory Button */}
                        <div className='flex items-center gap-3 w-full '>
                            <div className='flex-1'>
                                <SearchBar
                                    placeholder="Search Agent Memories..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className='!w-full'
                                />
                            </div>
                            <RippleButton>
                                <Button
                                    onClick={handleAddMemory}
                                    className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300 cursor-pointer"
                                >
                                    <PlusIcon />
                                    Add Memory
                                </Button>
                            </RippleButton>
                        </div>

                        {/* Memory Cards */}
                        {filteredMemories.map((memory, index) => (
                            <Card
                                key={memory.id}
                                className={cn(
                                    "feature-card-hover-container group overflow-hidden cursor-pointer transition-all duration-300 bg-white border border-border-color-0 hover:drop-shadow-xl hover:border-transparent py-7 h-full gap-2 !rounded-xl"
                                )}
                            >
                                <CardHeader>
                                    <div className="flex items-start space-x-5 clear-both flex-shrink-0">
                                        <div
                                            className={cn(
                                                "flex h-14 w-14 items-center justify-center rounded-lg relative bg-sidebar-accent text-foreground group-hover:!bg-white group-hover:!text-black transition-all duration-300"
                                            )}
                                            style={{
                                                color: `var(--icon-color-${(index % 4) + 1})`,
                                                backgroundColor: `rgb(from var(--icon-color-${(index % 4) + 1}) r g b / 0.1)`
                                            }}
                                        >
                                            <span className="w-full h-full flex items-center justify-center p-4">
                                                {memory.icon}
                                            </span>
                                        </div>
                                        <div className='flex-1'>
                                            <p className="text-sm text-gray-600 dark:text-foreground group-hover:text-white/90 transition-colors">
                                                {memory.content}
                                            </p>
                                        </div>
                                        <div className='flex items-end gap-3'>
                                            <RippleButton>
                                                <Button
                                                    variant="outline"
                                                    onClick={() => handleEditMemory(memory)}
                                                    className="gap-2 text-foreground border border-primary"
                                                >
                                                    <div className="!w-4">
                                                        <EditIcon />
                                                    </div>
                                                    Edit
                                                </Button>
                                            </RippleButton>

                                            <RippleButton>
                                                <Button
                                                    variant="outline"
                                                    onClick={(e) => handleTrashClick(e, memory.id)}
                                                    className="gap-2 text-foreground border border-primary"
                                                >
                                                    <div className="!w-4">
                                                        <Bin />
                                                    </div>
                                                    Delete
                                                </Button>
                                            </RippleButton>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent>
                                    <div className="my-3 space-y-3">
                                        <Separator className='!w-[80%]' />
                                        <p className='text-xs text-foreground dark:text-foreground group-hover:text-white/90 transition-colors'>
                                            Modified {memory.modified}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}

                        {filteredMemories.length === 0 && (
                            <div className="text-center py-8 text-gray-500">
                                No memories found matching "{query}"
                            </div>
                        )}
                    </>
                )}
            </div>

            <AddMemoriesModal
                open={isModalOpen}
                onOpenChange={setIsModalOpen}
                memory={editingMemory}
                onSave={handleSaveMemory}
            />

            <ConfirmDialog
                open={isDeleteOpen}
                onOpenChange={setIsDeleteOpen}
                title="Delete Memory?"
                description="This action cannot be undone. The memory will be permanently deleted."
                confirmText="Delete"
                variant="destructive"
                onConfirm={handleDeleteMemory}
            />
        </>
    );
};

export default AgentsMemoryGrid;

const AddMemoriesModal = ({ open, onOpenChange, memory, onSave }) => {
    const [selectedAgent, setSelectedAgent] = useState('');
    const [description, setDescription] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (open) {
            setSelectedAgent(memory?.type || '');
            setDescription(memory?.content || '');
            setErrors({});
        }
    }, [open, memory]);

    const handleSubmit = () => {
        const errs = {
            agent: !selectedAgent ? 'Agent selection is required' : '',
            description: !description.trim() ? 'Memory content is required' : '',
        };
        setErrors(errs);

        if (Object.values(errs).some(Boolean)) return;

        onSave({
            ...memory,
            type: selectedAgent,
            content: description,
            modified: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
            })
        });

        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="w-[60%] h-[60%] flex flex-col left-1/2 -translate-x-1/2 top-1/2 pt-8">
                <DialogHeader className="justify-center pb-4">
                    <DialogTitle className="text-2xl font-medium">
                        {memory ? 'Edit Memory' : 'Add New Memory'}
                    </DialogTitle>
                    <p className="text-sm text-foreground/60">
                        {memory ? 'Update the memory for the selected agent' : 'Add a new memory for the selected agent'}
                    </p>
                </DialogHeader>

                <div className="w-full h-full overflow-y-auto pr-2 flex flex-col justify-between">
                    <div className="flex flex-col space-y-6">
                        {/* Agent Selection Dropdown */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm text-foreground font-medium">Agent</label>
                            <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                                <SelectTrigger
                                    className={`w-full !h-12 rounded-lg cursor-pointer ${errors.agent ? 'border-red-500' : 'border-border-color-0'}`}
                                    aria-label="Select an agent"
                                >
                                    <SelectValue placeholder="Auto Claims Processing Agent" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl">
                                    <SelectItem value="auto-claims-processing-agent" className="rounded-lg cursor-pointer">
                                        Auto Claims Processing Agent
                                    </SelectItem>
                                    <SelectItem value="property-claims-agent" className="rounded-lg cursor-pointer">
                                        Property Claims Agent
                                    </SelectItem>
                                    <SelectItem value="health-claims-adjudication-agent" className="rounded-lg cursor-pointer">
                                        Health Claims Adjudication Agent
                                    </SelectItem>
                                    <SelectItem value="customer-support-agent" className="rounded-lg cursor-pointer">
                                        Customer Support Agent
                                    </SelectItem>
                                    <SelectItem value="fraud-detection-agent" className="rounded-lg cursor-pointer">
                                        Fraud Detection Agent
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.agent && (
                                <p className="text-xs text-red-500">{errors.agent}</p>
                            )}
                        </div>

                        {/* Memory Content Textarea */}
                        <div className="flex flex-col gap-3">
                            <label className="text-sm text-foreground font-medium">Memory Content</label>
                            <Textarea
                                value={description}
                                placeholder="Enter the memory content..."
                                onChange={(e) => setDescription(e.target.value)}
                                className={`border placeholder:text-sm h-32 placeholder:text-foreground/50 ${errors.description ? 'border-red-500' : 'border-border-color-0'
                                    }`}
                            />
                            {errors.description && (
                                <p className="text-xs text-red-500">{errors.description}</p>
                            )}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="py-3 flex justify-end gap-3 ">
                        <RippleButton>
                            <Button
                                variant="outline"
                                className="border-foreground/40 text-foreground/80 px-6"
                                onClick={() => onOpenChange(false)}
                            >
                                Cancel
                            </Button>
                        </RippleButton>

                        <RippleButton>
                            <Button
                                onClick={handleSubmit}
                                className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-2 rounded-lg !px-6 py-6 cursor-pointer duration-300"
                            >
                                {memory ? 'Update Memory' : 'Add Memory'}
                                <LeftArrow className="ml-2 rotate-180 w-4" />
                            </Button>
                        </RippleButton>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};