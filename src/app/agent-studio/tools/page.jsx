"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon, ToolsIcon } from "@/components/Icons";
import { ToolsCard } from "@/components/tools-card";
import { ToolsCustomCard } from "@/components/tools-custom-card";
import SearchBar from "@/components/search-bar";
import { RippleButton } from "@/components/ui/ripple-button";
import { ScaleDown } from "@/components/animations/Animations";
import AddToolModal from "@/components/agent-studio/CreateToolsModal";
import CreateCustomToolModal from "@/components/agent-studio/CreateCustomToolModal";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "@/components/animations/CountUp";
import { useSearchParams } from "next/navigation";
import AnimatedTabsSection from "@/components/common/TabsPane";

import FilterBar from "@/components/FeatureStore/feature-transformation/TransformationFilter";
import * as toolsApi from "@/lib/api/tools";

// Default Tools (read-only)
const FALLBACK_DEFAULT_TOOLS = [
  {
    id: "web-search",
    name: "Web Search",
    description: "Search the web for current information",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["api", "search"],
    variant: "light",
    isCustom: false,
  },
  {
    id: "calculator",
    name: "Calculator",
    description: "Perform mathematical calculations",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["function", "utility"],
    variant: "light",
    isCustom: false,
  },
  {
    id: "code-executor",
    name: "Code Executor",
    description: "Execute Python code safely",
    icon: <ToolsIcon />,
    status: "beta",
    tags: ["sandbox", "development"],
    variant: "light",
    isCustom: false,
  },
];

// Custom Tools (CRUD allowed)
const FALLBACK_CUSTOM_TOOLS = [
  {
    id: "weather-api",
    name: "Weather API",
    description: "Get current weather information for any location",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["custom", "api", "data"],
    variant: "light",
    isCustom: true,
    functionCode: `def get_weather(input_data, config):
    # Get weather information
    api_key = config.get('api_key')
    location = input_data.get('location')

    # Make API call to weather service
    response = requests.get(f'https://api.weather.com/v1/current?location={location}&key={api_key}')

    return response.json()`,
    parameters: [
      {
        id: 1,
        name: "api_key",
        displayLabel: "API Key",
        description: "Weather API key",
        type: "string",
        defaultValue: "",
        required: true,
      },
    ],
  },
  {
    id: "email-sender",
    name: "Email Sender",
    description: "Send emails through SMTP integration",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["custom", "api", "utility"],
    variant: "light",
    isCustom: true,
    functionCode: `def send_email(input_data, config):
    # Send email via SMTP
    smtp_server = config.get('smtp_server')
    smtp_port = config.get('smtp_port', 587)
    username = config.get('username')
    password = config.get('password')

    to_email = input_data.get('to')
    subject = input_data.get('subject')
    body = input_data.get('body')

    # Send email logic
    return {"status": "sent", "message_id": "12345"}`,
    parameters: [
      {
        id: 1,
        name: "smtp_server",
        displayLabel: "SMTP Server",
        description: "SMTP server address",
        type: "string",
        defaultValue: "smtp.gmail.com",
        required: true,
      },
      {
        id: 2,
        name: "smtp_port",
        displayLabel: "SMTP Port",
        description: "SMTP server port",
        type: "number",
        defaultValue: "587",
        required: true,
      },
      {
        id: 3,
        name: "username",
        displayLabel: "Username",
        description: "SMTP username",
        type: "string",
        defaultValue: "",
        required: true,
      },
      {
        id: 4,
        name: "password",
        displayLabel: "Password",
        description: "SMTP password",
        type: "string",
        defaultValue: "",
        required: true,
      },
    ],
  },
  {
    id: "database-query",
    name: "Database Query",
    description: "Execute SQL queries on connected databases",
    icon: <ToolsIcon />,
    status: "active",
    tags: ["custom", "function", "data"],
    variant: "light",
    isCustom: true,
    functionCode: `def execute_query(input_data, config):
    # Execute SQL query
    connection_string = config.get('connection_string')
    query = input_data.get('query')

    # Connect to database and execute query
    conn = create_connection(connection_string)
    result = conn.execute(query)

    return result.fetchall()`,
    parameters: [
      {
        id: 1,
        name: "connection_string",
        displayLabel: "Connection String",
        description: "Database connection string",
        type: "string",
        defaultValue: "",
        required: true,
      },
      {
        id: 2,
        name: "timeout",
        displayLabel: "Query Timeout",
        description: "Query timeout in seconds",
        type: "number",
        defaultValue: "30",
        required: false,
      },
    ],
  },
];

const FALLBACK_STATS = [
  { title: "Total Tools", value: "06" },
  { title: "Active Tools", value: "05" },
  { title: "Categories", value: "04" },
];

function ToolsContent() {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomToolModalOpen, setIsCustomToolModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState(null);

  const searchParams = useSearchParams();

  const [defaultTools, setDefaultTools] = useState(FALLBACK_DEFAULT_TOOLS);
  const [customTools, setCustomTools] = useState(FALLBACK_CUSTOM_TOOLS);
  const [stats, setStats] = useState(FALLBACK_STATS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tools and stats from API
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const [toolsData, statsData] = await Promise.all([
          toolsApi.getTools(),
          toolsApi.getToolStats(),
        ]);

        // Separate default and custom tools
        const defaultToolsList = toolsData.filter((tool) => !tool.isCustom);
        const customToolsList = toolsData.filter((tool) => tool.isCustom);

        setDefaultTools(defaultToolsList);
        setCustomTools(customToolsList);

        // Transform stats object to array format
        setStats([
          { title: "Total Tools", value: statsData.totalTools },
          { title: "Active Tools", value: statsData.activeTools },
          { title: "Categories", value: statsData.categories },
        ]);
      } catch (err) {
        setError(err.message || "Failed to load tools");
        console.error("Error fetching tools:", err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  // Handle custom tool edit
  const handleEditTool = (tool) => {
    setEditingTool(tool);
    setIsCustomToolModalOpen(true);
  };

  // Handle custom tool delete
  const handleDeleteTool = async (id) => {
    try {
      await toolsApi.deleteCustomTool(id);
      setCustomTools(customTools.filter((tool) => tool.id !== id));
    } catch (err) {
      setError(err.message || "Failed to delete custom tool");
      console.error("Error deleting custom tool:", err);
    }
  };

  // Reset editing tool when modal closes
  useEffect(() => {
    if (!isCustomToolModalOpen) {
      setEditingTool(null);
    }
  }, [isCustomToolModalOpen]);

  // FILTER BAR STATE
  const [selectedTags, setSelectedTags] = useState([]);
  const [view, setView] = useState("grid");
  const [sortOrder, setSortOrder] = useState("none");

  // Handle tool deletion from URL parameter
  useEffect(() => {
    const deleteId = searchParams.get("deleteId");
    if (!deleteId) return;

    async function deleteTool() {
      try {
        // Call API to delete the tool
        await toolsApi.deleteTool(deleteId);

        // Refresh the tools list after successful deletion
        const [toolsData, statsData] = await Promise.all([
          toolsApi.getTools(),
          toolsApi.getToolStats(),
        ]);

        setToolsState(toolsData);
        setStats([
          { title: "Total Tools", value: statsData.totalTools },
          { title: "Active Tools", value: statsData.activeTools },
          { title: "Categories", value: statsData.categories },
        ]);

        // Remove deleteId from URL after successful deletion
        window.history.replaceState({}, "", "/agent-studio/tools");
      } catch (err) {
        setError(err.message || "Failed to delete tool");
        console.error("Error deleting tool:", err);
      }
    }

    deleteTool();
  }, [searchParams]);

  // AVAILABLE TAGS (combine from both default and custom tools)
  const availableTags = useMemo(() => {
    const setTag = new Set();
    [...defaultTools, ...customTools].forEach((t) =>
      t.tags?.forEach((tag) => setTag.add(tag.toLowerCase()))
    );
    return Array.from(setTag).sort();
  }, [defaultTools, customTools]);

  // Filter function for tools
  const filterTools = (tools) => {
    let filtered = tools.filter((tool) => {
      const matchSearch =
        tool.name.toLowerCase().includes(query.toLowerCase()) ||
        tool.description.toLowerCase().includes(query.toLowerCase());

      const matchTags =
        selectedTags.length === 0 ||
        selectedTags.some((t) => tool.tags.includes(t));

      return matchSearch && matchTags;
    });

    // SORTING
    if (sortOrder === "asc") {
      filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === "desc") {
      filtered = [...filtered].sort((a, b) => b.name.localeCompare(a.name));
    }

    return filtered;
  };

  const filteredDefaultTools = filterTools(defaultTools);
  const filteredCustomTools = filterTools(customTools);

  return (
    <div className="flex flex-col h-full w-full overflow-hidden pb-5">
      <ScaleDown>
        <div className="space-y-6 p-6">
          {/* HEADER */}
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Tools</h1>
              <p className="mt-1 text-sm text-gray-600 dark:text-foreground">
                Manage agent tools and capabilities
              </p>
            </div>

            <RippleButton>
              <Link href="#">
                <Button
                  onClick={() => setIsCustomToolModalOpen(true)}
                  className="bg-sidebar-primary hover:bg-[#E64A19] text-white gap-3 rounded-full !px-6 !py-6 duration-300 cursor-pointer"
                >
                  <PlusIcon />
                  Create Custom Tool
                </Button>
              </Link>
            </RippleButton>
          </div>

          {/* STATS */}
          <div className="w-full flex items-center justify-between gap-4">
            {stats.map((item, index) => (
              <div
                key={index}
                className="flex flex-col bg-white gap-6 border border-border-color-0 rounded-3xl py-6 px-4 w-full dark:bg-card"
              >
                <span className="text-sm text-foreground/80">{item.title}</span>
                <span className="text-4xl font-medium mt-1">
                  <CountUp value={item.value} startOnView />
                </span>
              </div>
            ))}
          </div>

          {/* SEARCH */}
          <SearchBar
            placeholder="Search Tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {/* FILTER BAR */}
          <FilterBar
            selectedTags={selectedTags}
            onTagsChange={setSelectedTags}
            availableTags={availableTags}
            view={view}
            setView={setView}
            sortOrder={sortOrder}
            setSortOrder={setSortOrder}
            cards={[...defaultTools, ...customTools]}
          />

          {/* TABS */}
          <AnimatedTabsSection
            items={[
              {
                id: "default-tools",
                value: "default-tools",
                label: "Default Tools",
                render: () => (
                  <div className="flex-1 px-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={view}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`items-stretch ${
                          view === "grid"
                            ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "flex flex-col gap-5"
                        }`}
                      >
                        {filteredDefaultTools.map((tool, i) => (
                          <ToolsCard
                            key={`${tool.id}-${i}`}
                            tools={tool}
                            index={i}
                            view={view}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>

                    {/* EMPTY STATE */}
                    {filteredDefaultTools.length === 0 && (
                      <div className="flex h-64 items-center justify-center text-foreground/60 border border-border-color-0 rounded-xl mt-6">
                        <p className="text-sm">No default tools found</p>
                      </div>
                    )}
                  </div>
                ),
              },
              {
                id: "custom-tools",
                value: "custom-tools",
                label: "Custom Tools",
                render: () => (
                  <div className="flex-1 px-1">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={view}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`items-stretch ${
                          view === "grid"
                            ? "grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                            : "flex flex-col gap-5"
                        }`}
                      >
                        {filteredCustomTools.map((tool, i) => (
                          <ToolsCustomCard
                            key={`${tool.id}-${i}`}
                            tool={tool}
                            index={i}
                            view={view}
                            onDelete={handleDeleteTool}
                            onEdit={handleEditTool}
                          />
                        ))}
                      </motion.div>
                    </AnimatePresence>

                    {/* EMPTY STATE */}
                    {filteredCustomTools.length === 0 && (
                      <div className="flex h-64 items-center justify-center text-foreground/60 border border-border-color-0 rounded-xl mt-6">
                        <p className="text-sm">No custom tools found. Create one to get started!</p>
                      </div>
                    )}
                  </div>
                ),
              },
            ]}
            defaultValue="default-tools"
          />
        </div>
      </ScaleDown>

      <AddToolModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <CreateCustomToolModal
        open={isCustomToolModalOpen}
        onOpenChange={setIsCustomToolModalOpen}
        tool={editingTool}
        
      />
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
      <ToolsContent />
    </Suspense>
  );
}