"use client";
import { Funnel, Search, ArrowDownUp, GripVertical, X } from "lucide-react";
import { useState, useEffect } from "react";

interface SortCriterion {
  id: string;
  field: "name" | "createdAt" | "updatedAt" | "id";
  direction: "asc" | "desc";
  label: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [sortCriteria, setSortCriteria] = useState<SortCriterion[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const clients = [
    {
      id: 20,
      name: "John Doe",
      type: "Individual",
      email: "johndoe@email.com",
      status:"completed",
      updatedBy: "hello world",
      createdAt: "2023-10-01",
      updatedAt: "2023-10-05",
    },
    {
      id: 21,
      name: "Test Test",
      type: "Individual",
      email: "test@test.com",
       status:"completed",
      updatedBy: "hello world",
      createdAt: "2023-10-02",
      updatedAt: "2023-10-06",
    },
    {
      id: 22,
      name: "Jane Smith",
      type: "Company",
      email: "janesmith@email.com",
      status:"pending",
      updatedBy: "hello world",
      createdAt: "2023-10-03",
      updatedAt: "2023-10-07",
    },
    {
      id: 23,
      name: "Alice Johnson",
      type: "Company",
      email: "alicejohnson@email.com",
      status:"pending",
      updatedBy: "hello world",
      createdAt: "2023-10-04",
      updatedAt: "2023-10-08",
    },
    {
      id: 24,
      name: "Bob Brown",
      type: "Individual",
      email: "bobbrown@email.com",
      status:"completed",
      updatedBy: "hello world",
      createdAt: "2023-10-05",
      updatedAt: "2023-10-09",
    },
    {
      id: 25,
      name: "Charlie Davis",
      type: "Company",
      email: "charliedavis@email.com",
      status:"pending",
      updatedBy: "hello world",
      createdAt: "2023-10-06",
      updatedAt: "2023-10-10",
    },
    {
      id: 26,
      name: "Eve White",
      type: "Individual",
      email: "evewhite@email.com",
      status:"completed",
      updatedBy: "hello world",
      createdAt: "2023-10-07",
      updatedAt: "2023-10-11",  
    },
    {
      id: 27,
      name: "Frank Green",
      type: "Company",
      email: "frankgreen@email.com",
      status:"pending",
      updatedBy: "hello world",
      createdAt: "2023-10-08",
      updatedAt: "2023-10-12",
    },
    {
      id: 28,
      name: "Grace Black",
      type: "Individual",
      email: "graceblack@email.com",
      status:"completed",
      updatedBy: "hello world",
      createdAt: "2023-10-09",
      updatedAt: "2023-10-13",
    },
    {
      id: 29,
      name: "Hank Blue",
      type: "Company",
      email: "hankblue@email.com",
      status:"pending",
      updatedBy: "hello world",
      createdAt: "2023-10-10",
      updatedAt: "2023-10-14",
    },
  ];
  const [sortedClients, setSortedClients] = useState(clients);

  // Load sort criteria from localStorage on component mount
  useEffect(() => {
    const savedCriteria = localStorage.getItem('clientSortCriteria');
    if (savedCriteria) {
      try {
        const parsed = JSON.parse(savedCriteria);
        setSortCriteria(parsed);
        applySortWithCriteria(parsed);
      } catch (error) {
        console.error('Error parsing saved sort criteria:', error);
      }
    }
  }, []);

  // Save sort criteria to localStorage whenever it changes
  useEffect(() => {
    if (sortCriteria.length > 0) {
      localStorage.setItem('clientSortCriteria', JSON.stringify(sortCriteria));
    } else {
      localStorage.removeItem('clientSortCriteria');
    }
  }, [sortCriteria]);

  const applySortWithCriteria = (criteria: SortCriterion[]) => {
    if (criteria.length === 0) {
      setSortedClients(clients);
      return;
    }

    let sorted = [...clients];

    // Apply sort criteria in reverse order (last criteria has highest priority)
    criteria.reverse().forEach((criterion) => {
      sorted.sort((a, b) => {
        let aValue: any, bValue: any;
        
        switch (criterion.field) {
          case "name":
            aValue = a.name;
            bValue = b.name;
            break;
          case "createdAt":
            aValue = new Date(a.createdAt).getTime();
            bValue = new Date(b.createdAt).getTime();
            break;
          case "updatedAt":
            aValue = new Date(a.updatedAt).getTime();
            bValue = new Date(b.updatedAt).getTime();
            break;
          case "id":
            aValue = a.id;
            bValue = b.id;
            break;
          default:
            return 0;
        }

        if (criterion.field === "name") {
          const comparison = aValue.localeCompare(bValue);
          return criterion.direction === "asc" ? comparison : -comparison;
        } else {
          if (aValue < bValue) return criterion.direction === "asc" ? -1 : 1;
          if (aValue > bValue) return criterion.direction === "asc" ? 1 : -1;
          return 0;
        }
      });
    });

    setSortedClients(sorted);
  };

  const addSortCriterion = (field: SortCriterion["field"], label: string, specificDirection?: "asc" | "desc") => {
    const existingIndex = sortCriteria.findIndex(c => c.field === field);
    
    if (existingIndex !== -1) {
      // If specific direction provided, use it; otherwise toggle
      const newCriteria = [...sortCriteria];
      if (specificDirection) {
        newCriteria[existingIndex].direction = specificDirection;
      } else {
        newCriteria[existingIndex].direction = newCriteria[existingIndex].direction === "asc" ? "desc" : "asc";
      }
      setSortCriteria(newCriteria);
      applySortWithCriteria(newCriteria);
    } else {
      // Add new criterion with specified direction or default to "asc"
      const newCriterion: SortCriterion = {
        id: `${field}-${Date.now()}`,
        field,
        direction: specificDirection || "asc",
        label
      };
      const newCriteria = [...sortCriteria, newCriterion];
      setSortCriteria(newCriteria);
      applySortWithCriteria(newCriteria);
    }
  };

  const removeSortCriterion = (id: string) => {
    const newCriteria = sortCriteria.filter(c => c.id !== id);
    setSortCriteria(newCriteria);
    applySortWithCriteria(newCriteria);
  };

  const clearAllCriteria = () => {
    setSortCriteria([]);
    setSortedClients(clients);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    const newCriteria = [...sortCriteria];
    const draggedItem = newCriteria[draggedIndex];
    
    // Remove the dragged item
    newCriteria.splice(draggedIndex, 1);
    
    // Insert at new position
    newCriteria.splice(dropIndex, 0, draggedItem);
    
    setSortCriteria(newCriteria);
    applySortWithCriteria(newCriteria);
    setDraggedIndex(null);
  };

  const applySort = () => {
    applySortWithCriteria(sortCriteria);
    setShowSortPanel(false);
  };

  return (
    <div className="relative p-8">
      <h1 className="text-2xl font-semibold mb-4">Clients</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="flex gap-4">
          {["All", "Individual", "Company"].map((tab) => (
            <button
              key={tab}
              className={`pb-2 border-b-2 ${
                activeTab === tab
                  ? "border-black font-medium"
                  : "border-transparent text-gray-500"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex gap-4 items-center">
          <Search className="w-5 h-5 text-gray-500" />
          <ArrowDownUp className="w-5 h-5 text-gray-500 cursor-pointer"
            onClick={() => setShowSortPanel(!showSortPanel)} />
          <Funnel
            className="w-5 h-5 text-gray-500"
          />
          <button className="bg-black text-white px-4 py-2 rounded">
            + Add Client
          </button>
        </div>
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-800 text-left text-white">
            <tr>
              <th className="p-3 font-medium">Client ID</th>
              <th className="p-3 font-medium">Client Name</th>
              <th className="p-3 font-medium">Client Type</th>
              <th className="p-3 font-medium">Email</th>
                <th className="p-3 font-medium">Status</th>
              <th className="p-3 font-medium">Updated By</th>
              <th className="p-3 font-medium">Created At</th>
            </tr>
          </thead>
          <tbody>
            {sortedClients.map((client) => (
              <tr key={client.id} className="border-t">
                <td className="p-3 text-blue-500 cursor-pointer">
                  {client.id}
                </td>
                <td className="p-3">{client.name}</td>
                <td className="p-3">{client.type}</td>
                <td className="p-3">{client.email}</td>
                <td className="p-3 ">{client.status}</td>
                <td className="p-3">{client.updatedBy}</td>
                <td className="p-3">{client.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {showSortPanel && (
        <div className="absolute right-50 top-30 w-80 bg-white shadow-xl border rounded-lg z-50">
          <div className="p-3 border-b">
            <div className="flex flex-col items-start justify-between">
              <span className="font-semibold text-black mb-2">Sort By</span>
              <span className="text-sm text-black mb-3">Active Sorts (Drag to Change Priority):</span>

              {sortCriteria.length > 0 ? (
                <div className="w-full space-y-1">
                  {sortCriteria.map((criterion, index) => (
                    <div
                      key={criterion.id}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={handleDragOver}
                      onDrop={(e) => handleDrop(e, index)}
                      className={`flex items-center justify-between p-2 bg-gray-50 rounded border cursor-move hover:bg-gray-100 transition-colors ${
                        draggedIndex === index ? 'opacity-50' : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-black font-medium">{index + 1}.</span>
                        <span className="text-sm text-black">
                          {criterion.field === "name" ? "Client Name" :
                           criterion.field === "createdAt" ? "Created At" :
                           criterion.field === "updatedAt" ? "Updated At" : "Client Id"}:
                        </span>
                        <span className="text-sm text-black">
                          {criterion.field === "name" ? 
                            (criterion.direction === "asc" ? "A-Z" : "Z-A") :
                           criterion.field === "createdAt" || criterion.field === "updatedAt" ?
                            (criterion.direction === "asc" ? "Oldest to Newest" : "Newest to Oldest") :
                            (criterion.direction === "asc" ? "A-Z" : "Z-A")}
                        </span>
                      </div>
                      <button
                        onClick={() => removeSortCriterion(criterion.id)}
                        className="text-gray-900 hover:text-black hover:text-bold transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-sm text-gray-500 italic">No active sorts</div>
              )}
            </div>
          </div>

          <div className="p-4 space-y-4 text-sm text-gray-800">
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Client Name</span>
                </div>
                <div className="flex gap-2">
                  {["A-Z", "Z-A"].map((option) => (
                    <button
                      key={option}
                      onClick={() => addSortCriterion("name", "Client Name", option === "A-Z" ? "asc" : "desc")}
                      className={`px-2 py-1 border rounded text-xs ${
                        sortCriteria.find(c => c.field === "name" && 
                          ((option === "A-Z" && c.direction === "asc") || 
                           (option === "Z-A" && c.direction === "desc")))
                          ? "bg-blue-100 text-blue-600"
                          : ""
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-1 font-medium">Client Id</div>
                <div className="flex gap-2">
                  {["A-Z", "Z-A"].map((option) => (
                    <button
                      key={option}
                      onClick={() => addSortCriterion("id", "Client ID", option === "A-Z" ? "asc" : "desc")}
                      className={`px-2 py-1 border rounded text-xs ${
                        sortCriteria.find(c => c.field === "id" && 
                          ((option === "A-Z" && c.direction === "asc") || 
                           (option === "Z-A" && c.direction === "desc")))
                          ? "bg-blue-100 text-blue-600" : ""
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Created At</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addSortCriterion("createdAt", "Created At", "asc")}
                    className={`px-2 py-1 border rounded text-xs ${
                      sortCriteria.find(c => c.field === "createdAt" && c.direction === "asc")
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }`}
                  >
                    Oldest to Newest
                  </button>
                  <button
                    onClick={() => addSortCriterion("createdAt", "Created At", "desc")}
                    className={`px-2 py-1 border rounded text-xs ${
                      sortCriteria.find(c => c.field === "createdAt" && c.direction === "desc")
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }`}
                  >
                    Newest to Oldest
                  </button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium">Updated At</span>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => addSortCriterion("updatedAt", "Updated At", "asc")}
                    className={`px-2 py-1 border rounded text-xs ${
                      sortCriteria.find(c => c.field === "updatedAt" && c.direction === "asc")
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }`}
                  >
                    Oldest to Newest
                  </button>
                  <button
                    onClick={() => addSortCriterion("updatedAt", "Updated At", "desc")}
                    className={`px-2 py-1 border rounded text-xs ${
                      sortCriteria.find(c => c.field === "updatedAt" && c.direction === "desc")
                        ? "bg-blue-100 text-blue-600"
                        : ""
                    }`}
                  >
                    Newest to Oldest
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center ">
              <button
                className="text-sm text-gray-600 hover:underline disabled:opacity-50"
                onClick={clearAllCriteria}
                disabled={sortCriteria.length === 0}
              >
                Clear all
              </button>
              <button
                className="bg-black text-white text-sm px-4 py-1.5 rounded hover:bg-gray-800 transition-colors"
                onClick={applySort}
              >
                Apply Sort
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
