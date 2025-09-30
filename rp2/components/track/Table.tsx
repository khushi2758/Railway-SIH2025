// components/track/DataTable.tsx
"use client";
import React, { useState } from "react";
import { Eye, Download, Filter, Search, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

interface TrackRecord {
  id: string;
  section: string;
  date: string;
  defectType: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  length: string;
  status: "Pending" | "In Progress" | "Completed" | "Verified";
  inspector: string;
  coordinates: string;
  description: string;
  images: string[];
}

const DataTable = () => {
  const [selectedRecord, setSelectedRecord] = useState<TrackRecord | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterSeverity, setFilterSeverity] = useState("All");

  const trackRecords: TrackRecord[] = [
    {
      id: "TRK-001",
      section: "Section A",
      date: "2024-01-15",
      defectType: "Corrosion",
      severity: "Medium",
      length: "150m",
      status: "Completed",
      inspector: "Rohan Basu",
      coordinates: "28.6139° N, 77.2090° E",
      description: "Moderate corrosion detected in rail joints. Requires monitoring.",
      images: ["/track-1.jpg", "/track-2.jpg"]
    },
    {
      id: "TRK-002",
      section: "Section B",
      date: "2024-01-14",
      defectType: "Crack",
      severity: "High",
      length: "45m",
      status: "In Progress",
      inspector: "Khushi Bera",
      coordinates: "28.6145° N, 77.2102° E",
      description: "Longitudinal crack detected. Urgent repair needed.",
      images: ["/track-3.jpg"]
    },
    {
      id: "TRK-003",
      section: "Section C",
      date: "2024-01-13",
      defectType: "Wear",
      severity: "Low",
      length: "320m",
      status: "Verified",
      inspector: "Pralayesh Mukherjee",
      coordinates: "28.6151° N, 77.2115° E",
      description: "Normal wear pattern. Scheduled for routine maintenance.",
      images: []
    },
    {
      id: "TRK-004",
      section: "Section D",
      date: "2024-01-12",
      defectType: "Alignment",
      severity: "Critical",
      length: "85m",
      status: "Pending",
      inspector: "Rishita Roy",
      coordinates: "28.6160° N, 77.2128° E",
      description: "Track misalignment detected. Immediate attention required.",
      images: ["/track-4.jpg", "/track-5.jpg"]
    },
    {
      id: "TRK-005",
      section: "Section A",
      date: "2024-01-11",
      defectType: "Corrosion",
      severity: "Medium",
      length: "210m",
      status: "Completed",
      inspector: "Samay Mandal",
      coordinates: "28.6135° N, 77.2085° E",
      description: "Surface corrosion. Treated with anti-corrosion coating.",
      images: ["/track-6.jpg"]
    }
  ];

  const filteredRecords = trackRecords.filter(record => {
    const matchesSearch = record.section.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.defectType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = filterSeverity === "All" || record.severity === filterSeverity;
    return matchesSearch && matchesSeverity;
  });

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "Low": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Medium": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "High": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "Critical": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500/20 text-green-400";
      case "In Progress": return "bg-blue-500/20 text-blue-400";
      case "Pending": return "bg-yellow-500/20 text-yellow-400";
      case "Verified": return "bg-purple-500/20 text-purple-400";
      default: return "bg-gray-500/20 text-gray-400";
    }
  };

  const openRecordModal = (record: TrackRecord) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  // Chart data for the modal
  const historicalData = [65, 59, 80, 81, 56, 55, 40, 45, 50, 55, 60, 65];
  const maintenanceData = [28, 48, 40, 19, 86, 27, 90, 45, 60, 35, 70, 45];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  return (
    <>
      <div className="space-y-6">
        {/* Header with Filters */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search records..."
                className="pl-10 pr-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-cyan-500 transition-colors"
              value={filterSeverity}
              onChange={(e) => setFilterSeverity(e.target.value)}
            >
              <option value="All">All Severity</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Critical">Critical</option>
            </select>
          </div>
          <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg flex items-center gap-2 transition-colors">
            <Download size={18} />
            Export Data
          </button>
        </div>

        {/* Records Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRecords.map((record) => (
            <div
              key={record.id}
              className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-4 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer group"
              onClick={() => openRecordModal(record)}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">
                    {record.section}
                  </h3>
                  <p className="text-sm text-gray-400">{record.id}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(record.severity)}`}>
                  {record.severity}
                </span>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Defect Type:</span>
                  <span className="text-white">{record.defectType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Length:</span>
                  <span className="text-white">{record.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Date:</span>
                  <span className="text-white">{record.date}</span>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${getStatusColor(record.status)}`}>
                  {record.status}
                </span>
                <div className="flex items-center gap-2 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye size={16} />
                  <span className="text-sm">View Details</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          {/* Line Chart - Defect Trend */}
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-cyan-300 mb-4">Defect Trend Analysis</h3>
            <div className="h-64 relative">
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
                {historicalData.map((value, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div className="relative group">
                      <div 
                        className="w-3 bg-gradient-to-t from-cyan-500 to-cyan-300 rounded-t-lg transition-all duration-300 hover:from-cyan-400 hover:to-cyan-200"
                        style={{ height: `${(value / 100) * 200}px` }}
                      />
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10">
                        {value}%
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 mt-2">{months[index]}</span>
                  </div>
                ))}
              </div>
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                {[0, 25, 50, 75, 100].map((line) => (
                  <div key={line} className="flex items-center">
                    <div className="w-full border-t border-neutral-700" />
                    <span className="text-xs text-gray-500 ml-2 w-8">{line}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Radial Chart - Severity Distribution */}
          <div className="bg-neutral-800/50 border border-neutral-700 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-purple-300 mb-4">Severity Distribution</h3>
            <div className="h-64 flex items-center justify-center">
              <div className="relative w-48 h-48">
                {/* Critical */}
                <div className="absolute inset-0 rounded-full border-[12px] border-red-500/50" 
                     style={{ clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 20%)' }} />
                {/* High */}
                <div className="absolute inset-0 rounded-full border-[12px] border-orange-500/50" 
                     style={{ clipPath: 'polygon(0 20%, 100% 20%, 100% 45%, 0 45%)' }} />
                {/* Medium */}
                <div className="absolute inset-0 rounded-full border-[12px] border-yellow-500/50" 
                     style={{ clipPath: 'polygon(0 45%, 100% 45%, 100% 75%, 0 75%)' }} />
                {/* Low */}
                <div className="absolute inset-0 rounded-full border-[12px] border-green-500/50" 
                     style={{ clipPath: 'polygon(0 75%, 100% 75%, 100% 100%, 0 100%)' }} />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">42</div>
                    <div className="text-sm text-gray-400">Total Defects</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { label: "Critical", value: "8", color: "red" },
                { label: "High", value: "12", color: "orange" },
                { label: "Medium", value: "15", color: "yellow" },
                { label: "Low", value: "7", color: "green" }
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full bg-${item.color}-500`} />
                  <span className="text-sm text-gray-300">{item.label}</span>
                  <span className="text-sm text-white font-medium ml-auto">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Record Detail Modal */}
      {showModal && selectedRecord && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-900 border border-neutral-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-700">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedRecord.section}</h2>
                  <p className="text-gray-400">{selectedRecord.id} • {selectedRecord.date}</p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-300">Defect Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Severity:</span>
                      <span className={`px-2 py-1 rounded text-sm ${getSeverityColor(selectedRecord.severity)}`}>
                        {selectedRecord.severity}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Defect Type:</span>
                      <span className="text-white">{selectedRecord.defectType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Length:</span>
                      <span className="text-white">{selectedRecord.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Status:</span>
                      <span className={`px-2 py-1 rounded text-sm ${getStatusColor(selectedRecord.status)}`}>
                        {selectedRecord.status}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-300">Location & Inspector</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Coordinates:</span>
                      <span className="text-white text-sm">{selectedRecord.coordinates}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Inspector:</span>
                      <span className="text-white">{selectedRecord.inspector}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Description</h3>
                <p className="text-gray-300 bg-neutral-800/50 rounded-lg p-4">
                  {selectedRecord.description}
                </p>
              </div>

              {/* Mini Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-cyan-300 mb-3">Defect Progression</h4>
                  <div className="h-32 flex items-end justify-between px-2">
                    {[30, 45, 60, 75, 65, 80, 85].map((value, index) => (
                      <div key={index} className="flex flex-col items-center">
                        <div 
                          className="w-2 bg-gradient-to-t from-red-500 to-red-300 rounded-t"
                          style={{ height: `${value}%` }}
                        />
                        <span className="text-xs text-gray-400 mt-1">W{index + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-neutral-800/50 rounded-lg p-4">
                  <h4 className="text-sm font-semibold text-purple-300 mb-3">Repair Progress</h4>
                  <div className="h-32 flex items-center justify-center">
                    <div className="relative w-20 h-20">
                      <div className="absolute inset-0 rounded-full border-4 border-neutral-700" />
                      <div 
                        className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent border-r-transparent transform -rotate-45"
                        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 65%, 0 65%)' }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-lg font-bold text-white">65%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4 border-t border-neutral-700">
                <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg transition-colors">
                  Assign Repair
                </button>
                <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors">
                  Download Report
                </button>
                <button className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-lg transition-colors ml-auto">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataTable;