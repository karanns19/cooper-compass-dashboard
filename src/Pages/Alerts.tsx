/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useMemo, useEffect } from 'react';
import { Search, MoreVertical, ChevronDown, X } from 'lucide-react';
import { alertsData, AlertItem } from '../data/AlertsData';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Alerts() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const [selectedAlert, setSelectedAlert] = useState<AlertItem | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state && location.state.alertId) {
      const found = alertsData.find(a => a.id === location.state.alertId);
      if (found) setSelectedAlert(found);
      // Remove alertId from state after opening
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location.state, location.pathname, navigate]);

  const dateOptions = ['Today', 'Yesterday', 'Last 7 days', 'Last 30 days', 'All'];
  const priorityOptions = ['All', 'High', 'Medium', 'Low'];

  const filteredAlerts = useMemo(() => {
    return alertsData.filter(alert => {
      const matchesSearch = 
        alert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        alert.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = 
        selectedPriority === 'All' || 
        alert.priority.toLowerCase() === selectedPriority.toLowerCase();

      return matchesSearch && matchesPriority;
    });
  }, [searchQuery, selectedPriority]);

  const getAlertColor = (type: AlertItem['type']) => {
    const colors = {
      transfer: 'bg-indigo-500',
      security: 'bg-red-500',
      missing: 'bg-yellow-500',
      unclaimed: 'bg-indigo-500',
      damaged: 'bg-indigo-500'
    };
    return colors[type] || 'bg-gray-500';
  };

  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredAlerts.slice(indexOfFirstItem, indexOfLastItem);

  const goToPage = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const getPageNumbers = () => {
    const pages = [];
    for (let i = Math.max(1, currentPage - 2); i <= Math.min(totalPages, currentPage + 2); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="p-6 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Alerts</h1>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-[300px] focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="relative">
            <button 
              className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2"
              onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
            >
              {selectedDate}
              <ChevronDown className="h-4 w-4" />
            </button>
            {isDateDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {dateOptions.map((date) => (
                  <button
                    key={date}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50"
                    onClick={() => {
                      setSelectedDate(date);
                      setIsDateDropdownOpen(false);
                    }}
                  >
                    {date}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button 
              className="px-4 py-2 border border-gray-200 rounded-lg flex items-center gap-2"
              onClick={() => setIsPriorityDropdownOpen(!isPriorityDropdownOpen)}
            >
              Priority
              <ChevronDown className="h-4 w-4" />
            </button>
            {isPriorityDropdownOpen && (
              <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                {priorityOptions.map((priority) => (
                  <button
                    key={priority}
                    className="w-full px-4 py-2 text-left hover:bg-gray-50"
                    onClick={() => {
                      setSelectedPriority(priority);
                      setIsPriorityDropdownOpen(false);
                    }}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {currentItems.map((alert) => (
          <div
            key={alert.id}
            className="bg-white rounded-lg p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedAlert(alert)}
          >
            <div className={`w-1 h-16 rounded-full ${getAlertColor(alert.type)}`} />

            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{alert.title}</h2>
                  <p className="text-gray-600 mt-1">{alert.description}</p>
                </div>
                <span className="text-gray-500 text-sm">{alert.timestamp}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex items-center justify-between">
        <select 
          className="border border-gray-200 rounded-lg px-3 py-2"
          value={itemsPerPage}
          onChange={() => setCurrentPage(1)}
        >
          <option>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredAlerts.length)} of {filteredAlerts.length}</option>
        </select>

        <div className="flex items-center gap-2">
          <button 
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            onClick={() => goToPage(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button 
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              className={`px-4 py-2 rounded-lg ${
                pageNum === currentPage
                  ? 'bg-[#432143] text-white'
                  : 'border border-gray-200 hover:bg-gray-50'
              }`}
              onClick={() => goToPage(pageNum)}
            >
              {pageNum}
            </button>
          ))}

          <button 
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button 
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50"
            onClick={() => goToPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>

      {/* Alert Details Drawer */}
      <AnimatePresence>
        {selectedAlert && (
          <motion.div
            key="alert-details"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 p-8 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-[#432143]">Alert Details</h2>
              <button onClick={() => setSelectedAlert(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                <X />
              </button>
            </div>
            <div className="space-y-4 text-gray-700">
              <div><b>Title:</b> {selectedAlert.title}</div>
              <div><b>Description:</b> {selectedAlert.description}</div>
              <div><b>Type:</b> {selectedAlert.type}</div>
              <div><b>Priority:</b> {selectedAlert.priority}</div>
              <div><b>Timestamp:</b> {selectedAlert.timestamp}</div>
              <div><b>Details:</b><br />
                <pre className="bg-gray-50 rounded p-3 mt-1 whitespace-pre-wrap text-sm">{selectedAlert.details}</pre>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}