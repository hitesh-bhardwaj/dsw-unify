"use client";

import { useMemo, useState } from "react";
import SearchBar from "@/components/search-bar";
import { ScaleDown } from "@/components/animations/Animations";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { RippleButton } from "@/components/ui/ripple-button";

const baseRows = [
  {
    no: 1,
    name: "idbidemo",
    models: 3,
    contributorsTotal: 10,
    contributorsImages: [
      "https://i.pravatar.cc/64?img=1",
      "https://i.pravatar.cc/64?img=2",
      "https://i.pravatar.cc/64?img=3",
      "https://i.pravatar.cc/64?img=4",
     
    ],
    date: "August 15, 2024",
  },
  {
    no: 2,
    name: "churnpredictionv1",
    models: 1,
    contributorsTotal: 4,
    contributorsImages: [
       "https://i.pravatar.cc/64?img=5",
      "https://i.pravatar.cc/64?img=6",
      "https://i.pravatar.cc/64?img=7",
      "https://i.pravatar.cc/64?img=8",
     
    ],
    date: "August 15, 2024",
  },
  {
    no: 3,
    name: "churnpredictionv1",
    models: 1,
    contributorsTotal: 1,
    contributorsImages: [
       "https://i.pravatar.cc/64?img=9",
      "https://i.pravatar.cc/64?img=10",
      "https://i.pravatar.cc/64?img=11",
      "https://i.pravatar.cc/64?img=12",
    ],
    date: "August 15, 2024",
  },
  {
    no: 4,
    name: "salesforecasting",
    models: 3,
    contributorsTotal: 10,
    contributorsImages: [
      "https://i.pravatar.cc/64?img=13",
      "https://i.pravatar.cc/64?img=14",
      "https://i.pravatar.cc/64?img=15",
      "https://i.pravatar.cc/64?img=16",
      
    ],
    date: "August 15, 2024",
  },
  {
    no: 5,
    name: "demopersist654",
    models: 1,
    contributorsTotal: 10,
    contributorsImages: [
      "https://i.pravatar.cc/64?img=17",
      "https://i.pravatar.cc/64?img=18",
      "https://i.pravatar.cc/64?img=19",
      "https://i.pravatar.cc/64?img=20",
    ],
    date: "August 15, 2024",
  },
];

/* Repeat to show pagination clearly */
const repeatedData = Array.from({ length: 4 }).flatMap((_, block) =>
  baseRows.map((r, idx) => ({
    ...r,
    no: block * baseRows.length + idx + 1,
    name: `${r.name}${block ? `-${block + 1}` : ""}`,
  }))
);

/* ---------- Helpers ---------- */
function parseDate(d) { return new Date(d).getTime(); }
function compareValues(a, b) { if (a === b) return 0; return a < b ? -1 : 1; }

function SortButton({ active, dir, onClick, label }) {
  return (
    <button
      type="button"
      className="inline-flex items-center gap-1 text-foreground/80 hover:text-foreground transition-colors"
      onClick={onClick}
      aria-label={`Sort by ${label} ${dir === "desc" ? "ascending" : "descending"}`}
      title={`Sort by ${label}`}
    >
      {active ? (dir === "desc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />)
              : <ChevronDown className="h-4 w-4 opacity-40" />}
    </button>
  );
}

/* ---------- Page ---------- */
export default function UseCasesPage() {
  const [rows, setRows] = useState(repeatedData);
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState(null); 
  const [sortDir, setSortDir] = useState(null); 
  const [itemsPerPage, setItemsPerPage] = useState(5); 
  const [page, setPage] = useState(1);

  const toggleSort = (key) => {
    if (key === sortKey) setSortDir((prev) => (prev === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
  const totalPages = Math.max(1, Math.ceil(rows.length / itemsPerPage));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;

  const pageSlice = useMemo(() => rows.slice(start, end), [rows, start, end]);

  const pageFiltered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return pageSlice;
    return pageSlice.filter((r) =>
      r.name.toLowerCase().includes(q) ||
      String(r.models).includes(q) ||
      String(r.contributorsTotal).includes(q) ||
      r.date.toLowerCase().includes(q)
    );
  }, [pageSlice, query]);

  // 3) Sort ONLY the filtered rows of this page
  const pageRows = useMemo(() => {
    const sorted = [...pageFiltered].sort((a, b) => {
      let av, bv;
      if (sortKey === "name") {
        av = a.name.toLowerCase(); bv = b.name.toLowerCase();
      } else if (sortKey === "models") {
        av = a.models; bv = b.models;
      } else {
        av = parseDate(a.date); bv = parseDate(b.date);
      }
      const base = compareValues(av, bv);
      return sortDir === "asc" ? base : -base;
    });
    return sorted;
  }, [pageFiltered, sortKey, sortDir]);

  const goToPage = (p) => { if (p >= 1 && p <= totalPages) setPage(p); };
  const handleItemsPerPage = (n) => { setItemsPerPage(n); setPage(1); };

  const pageList = (() => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, 4, "ellipsis", totalPages];
    if (currentPage >= totalPages - 2) return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    return [1, "ellipsis", currentPage - 1, currentPage, currentPage + 1, "ellipsis", totalPages];
  })();

  return (
    <div className="flex flex-col h-full w-full overflow-hidden">
      <ScaleDown>
        <div className="space-y-6 p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-3xl font-medium text-foreground">Use Cases</h1>
            </div>
          </div>
          <SearchBar
            placeholder="Search Use Cases ..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-auto p-6 pt-0">
          <div className="w-full">
            {/* Bordered table container */}
            <div className="overflow-hidden rounded-md border p-3">
              <Table className="border-0">
                <TableHeader className={cn("text-xs px-10 !rounded-[3vw] bg-accent  !shadow-none  overflow-hidden")}>
                  <TableRow className={cn("px-10 !rounded-[3vw] border ")}>
                    <TableHead className="w-30 text-left font-normal py-5 pl-10">S.No</TableHead>
                    <TableHead className="text-left w-40">
                      <div className="inline-flex items-center gap-2 font-normal">
                        <span>Name</span>
                        <SortButton
                          active={sortKey === "name"}
                          dir={sortDir}
                          onClick={() => toggleSort("name")}
                          label="Name"
                        />
                      </div>
                    </TableHead>

                    <TableHead className="text-left w-20">
                      <div className="inline-flex items-center gap-2 font-normal">
                        <span>Models</span>
                        <SortButton
                          active={sortKey === "models"}
                          dir={sortDir}
                          onClick={() => toggleSort("models")}
                          label="Models"
                        />
                      </div>
                    </TableHead>

                    <TableHead className="text-left font-normal w-40">Contributors</TableHead>

                    <TableHead className="text-left font-normal w-40">
                      <div className="inline-flex items-center gap-2">
                        <span>Date</span>
                        <SortButton
                          active={sortKey === "date"}
                          dir={sortDir}
                          onClick={() => toggleSort("date")}
                          label="Date"
                        />
                      </div>
                    </TableHead>

                    <TableHead className=" font-normal w-40 text-left">Actions</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody className={"text-xs font-normal !mt-3"}>
                  {pageRows.map((data, index) => {
                    const show = data.contributorsImages.slice(0, 5);
                    return (
                      <TableRow key={`${data.no}-${index}`} className={""}>
                        <TableCell className="text-left w-30 pl-10 ">{data.no}</TableCell>

                        {/* Fixed width cell + truncation */}
                        <TableCell className="text-left w-40">
                          <div className=" truncate whitespace-nowrap">{data.name}</div>
                        </TableCell>

                        <TableCell className="text-left w-20">{data.models}</TableCell>

                        {/* Contributors: 5 rounded avatars + +N */}
                        <TableCell className="text-left w-40">
                          <div className="flex items-center gap-3">
                            <div className="flex -space-x-2">
                              {show.map((src, i) => (
                                <img
                                  key={i}
                                  src={src}
                                  alt={`${data.name} contributor ${i + 1}`}
                                  className="h-8 w-8 rounded-full ring-2 ring-background border border-border object-cover"
                                  loading="lazy"
                                />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">
                              +{data.contributorsTotal}
                            </span>
                          </div>
                        </TableCell>

                        <TableCell className="text-left whitespace-nowrap w-40">{data.date}</TableCell>

                        <TableCell className="text-left w-40">
                          <div className="inline-flex items-center gap-2">
                             <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-primary font-normal !h-10"
                >
                  View
                </Button>
              </RippleButton>
                             <RippleButton>
                <Button
                  variant="outline"
                  className="gap-2 text-foreground border border-red font-normal !h-10"
                >
                  Delete
                </Button>
              </RippleButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>

              {/* Bottom-right controls inside the table container */}
              
            </div>
            <div className=" p-3 flex w-full items-center justify-end gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#596066]">Items Per Page:</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      
                      <Button variant="outline" size="sm" className={"shadow-none w-18 flex items-center justify-center h-8 font-normal border-[#596066] text-[#596066] rounded-full cursor-pointer !ring-0 !focus-0"}>{itemsPerPage}  <ChevronDown/></Button>
                     
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-36">
                      {[5,6,7,8,9,10].map((n) => (
                        <DropdownMenuItem
                          key={n}
                          onClick={() => handleItemsPerPage(n)}
                          className={n === itemsPerPage ? "font-medium" : ""}
                        >
                          {n}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

            <div>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => { e.preventDefault(); goToPage(currentPage - 1); }}
                        className={"text-primary font-normal"}
                      />
                    </PaginationItem>

                    {pageList.map((p, i) =>
                      p === "ellipsis" ? (
                        <PaginationItem key={`e-${i}`}>
                          <PaginationEllipsis />
                        </PaginationItem>
                      ) : (
                        <PaginationItem key={p}>
                          <PaginationLink
                            href="#"
                            onClick={(e) => { e.preventDefault(); goToPage(p); }}
                            aria-current={p === currentPage ? "page" : undefined}
                            isActive={p === currentPage}
                            className={`flex items-center justify-center border-none rounded-full   ${currentPage ===p? "bg-primary text-white hover:bg-primary hover:text-white ":"bg-transparent text-black hover:bg-accent"}`}
                          >
                            {p}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => { e.preventDefault(); goToPage(currentPage + 1); }}
                        className={"text-primary font-normal"}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                </div>
              </div>
          </div>
        </div>
      </ScaleDown>
    </div>
  );
}
