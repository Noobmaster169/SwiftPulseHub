import React, { useState, useEffect } from 'react';
import { TaskData, EditHistoryEntry } from '@/utils/interface';

type EditHistoryProps = {
    editHistory: EditHistoryEntry[];
};

const EditHistory: React.FC<EditHistoryProps> = ({ editHistory }) => {
    const [filteredHistory, setFilteredHistory] = useState<EditHistoryEntry[]>(editHistory);
    const [filterType, setFilterType] = useState<string>('all');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);
  
    useEffect(() => {
      setFilteredHistory(editHistory);
    }, [editHistory]);
  
    const handleFilterChange = (type: string) => {
      setFilterType(type);
    };
  
    const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setStartDate(new Date(e.target.value));
    };
  
    const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEndDate(new Date(e.target.value));
    };
  
    const filteredHistoryEntries = filteredHistory
      .filter((entry) => {
        if (filterType !== 'all' && entry.type !== filterType) return false;
        if (startDate && new Date(entry.date) < startDate) return false;
        if (endDate && new Date(entry.date) > endDate) return false;
        return true;
      });
  
    return (
      <div className="edit-history">
        <h2 className="text-xl font-bold mb-2">Edit History</h2>
  
        <div className="filter-options mb-4">
          <label className="mr-2">Filter by Type:</label>
          <select value={filterType} onChange={(e) => handleFilterChange(e.target.value)} className="mr-4">
            <option value="all">All</option>
            <option value="status">Status Update</option>
            <option value="reassignment">Reassignment</option>
            <option value="description">Description Edit</option>
          </select>
  
          <label className="mr-2">Start Date:</label>
          <input type="date" onChange={handleStartDateChange} className="mr-4" />
  
          <label className="mr-2">End Date:</label>
          <input type="date" onChange={handleEndDateChange} />
        </div>
  
        {filteredHistoryEntries.length > 0 ? (
          <ul>
            {filteredHistoryEntries.map((entry, index) => (
              <li key={index} className="mb-2 border-b pb-2">
                <p><strong>Date:</strong> {new Date(entry.date).toLocaleString()}</p>
                <p><strong>Modified by:</strong> {entry.modifiedBy}</p>
                <p><strong>Change Type:</strong> {entry.type}</p>
                <p><strong>Details:</strong> {entry.details}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No Edit History Available</p>
        )}
      </div>
    );
  };
  
  export default EditHistory;
  