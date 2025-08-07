"use client";
import { Funnel, Search, ArrowDownUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [activeTab, setActiveTab] = useState("All");
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [clientNameSort, setClientNameSort] = useState<"A-Z" | "Z-A" | "">("");
  const [createdAtSort, setCreatedAtSort] = useState<
    "Newest-Oldest" | "Oldest-Newest" | ""
  >("");
  const [updatedAt, setUpdatedAt] = useState<
    "Newest-Oldest" | "Oldest-Newest" | ""
  >("");
  const [clientIdSort, setClientIdSort] = useState<"A-Z" | "Z-A" | "">("");

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

  const applySort = () => {
    let sorted = [...clients];

    if (clientNameSort === "A-Z") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (clientNameSort === "Z-A") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (createdAtSort === "Newest-Oldest") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    } else if (createdAtSort === "Oldest-Newest") {
      sorted.sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }

    if (updatedAt === "Newest-Oldest") {
      sorted.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    } else if (updatedAt === "Oldest-Newest") {
      sorted.sort(
        (a, b) =>
          new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
      );
    }

    if (clientIdSort === "A-Z") {
      sorted.sort((a, b) => a.id - b.id);
    } else if (clientIdSort === "Z-A") {
      sorted.sort((a, b) => b.id - a.id);
    }

    setSortedClients(sorted);
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
          <ArrowDownUp className="w-5 h-5 text-gray-500" />
          <Funnel
            className="w-5 h-5 text-gray-500 cursor-pointer"
            onClick={() => setShowSortPanel(!showSortPanel)}
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
        <div className="absolute right-10 top-40 w-80 bg-white shadow-xl border rounded-lg z-50">
          <div className="p-4 border-b">
            <div className="flex flex-col items-start justify-between">
              <span className="font-semibold text-gray-700">Sort By</span>
              <div className="flex flex-col flex-wrap gap-1">
                {clientNameSort && (
                  <span className="flex gap-12 px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded">
                    Name: {clientNameSort}
                     <button className="text-gray-400 hover:text-black" onClick={() => setClientNameSort("")}>✕</button>
                  </span>
                )}
                {createdAtSort && (
                  <span className="flex gap-4  px-2 py-1 bg-green-100 text-green-600 text-xs rounded">
                    Created: {createdAtSort === "Newest-Oldest" ? "Newest" : "Oldest"}
                     <button className="text-gray-400 hover:text-black" onClick={() => setCreatedAtSort("")}>✕</button>
                  </span>
                )}
                {updatedAt && (
                  <span className="flex gap-4  px-2 py-1 bg-purple-100 text-purple-600 text-xs rounded">
                    Updated: {updatedAt === "Newest-Oldest" ? "Newest" : "Oldest"}
                     <button className="text-gray-400 hover:text-black" onClick={() => setUpdatedAt("")}>✕</button>
                  </span>
                )}
                {clientIdSort && (
                  <span className="flex gap-17  px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded">
                    ID: {clientIdSort}
                     <button className="text-gray-400 hover:text-black" onClick={() => setClientIdSort("")}>✕</button>
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 space-y-4 text-sm text-gray-800">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Client Name</span>
               
              </div>
              <div className="flex gap-2">
                {["A-Z", "Z-A"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setClientNameSort(option as "A-Z" | "Z-A")}
                    className={`px-2 py-1 border rounded text-xs ${
                      clientNameSort === option
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
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Created At</span>
               
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setCreatedAtSort("Newest-Oldest")}
                  className={`px-2 py-1 border rounded text-xs ${
                    createdAtSort === "Newest-Oldest"
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  Newest to Oldest
                </button>
                <button
                  onClick={() => setCreatedAtSort("Oldest-Newest")}
                  className={`px-2 py-1 border rounded text-xs ${
                    createdAtSort === "Oldest-Newest"
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  Oldest to Newest
                </button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium">Updated At</span>
              
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setUpdatedAt("Newest-Oldest")}
                  className={`px-2 py-1 border rounded text-xs ${
                    updatedAt === "Newest-Oldest"
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  Newest to Oldest
                </button>
                <button
                  onClick={() => setUpdatedAt("Oldest-Newest")}
                  className={`px-2 py-1 border rounded text-xs ${
                    updatedAt === "Oldest-Newest"
                      ? "bg-blue-100 text-blue-600"
                      : ""
                  }`}
                >
                  Oldest to Newest
                </button>
              </div>
            </div>

            <div>
              <div className="mb-1 font-medium">Client ID</div>
              <div className="flex gap-2">
                {["A-Z", "Z-A"].map((option) => (
                  <button
                    key={option}
                    onClick={() => setClientIdSort(option as "A-Z" | "Z-A")}
                    className={`px-2 py-1 border rounded text-xs ${
                      clientIdSort === option ? "bg-blue-100 text-blue-600" : ""
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <button
                className="text-sm text-gray-600 hover:underline"
                onClick={() => {
                  setClientNameSort("");
                  setCreatedAtSort("");
                  setUpdatedAt("");
                  setClientIdSort("");
                  setSortedClients(clients);
                }}
              >
                Clear all
              </button>
              <button
                className="bg-black text-white text-sm px-4 py-1.5 rounded"
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
