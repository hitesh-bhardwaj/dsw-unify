import { ConfirmDialog } from '@/components/common/Confirm-Dialog';
import { Bin, EditIcon, LeftArrow, MemoriesIcon, PlusIcon } from '@/components/Icons';
import SearchBar from '@/components/search-bar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RippleButton } from '@/components/ui/ripple-button';
import { Separator } from '@/components/ui/separator';
import React, { useState, useMemo } from 'react';
import { AddMemoriesModal } from '../AddMemoriesModal';


// Main Component
const OrganizationMemoryGrid = ({ memories: initialMemories }) => {
  const [memories, setMemories] = useState(initialMemories);
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMemory, setEditingMemory] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [memoryToDelete, setMemoryToDelete] = useState(null); // Add this

  const filteredMemories = useMemo(() => {
    if (!query.trim()) return memories;
    
    const searchTerm = query.toLowerCase();
    return memories.filter(memory => 
      memory.content?.toLowerCase().includes(searchTerm) ||
      memory.modified?.toLowerCase().includes(searchTerm)
    );
  }, [memories, query]);

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
        icon: <MemoriesIcon/>
      };
      setMemories([...memories, newMemory]);
    }
  };

  const handleTrashClick = (e, memoryId) => {
    e.preventDefault();
    e.stopPropagation();
    setMemoryToDelete(memoryId); // Store which memory to delete
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
      <div className="space-y-6">
        <div className='flex items-center gap-3 w-full'>
          <div className='flex-1'>
            <SearchBar
              placeholder="Search Organization Memories..."
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
              <PlusIcon/>
              Add Memory
            </Button>
          </RippleButton>
        </div>

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
                      className="gap-2 text-foreground border border-primary group-hover:border-white"
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
                      className="gap-2 text-foreground border border-primary group-hover:border-white"
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

export default OrganizationMemoryGrid;