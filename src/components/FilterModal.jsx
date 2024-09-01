import React, { useState } from 'react';
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const FilterModal = ({ isOpen, onClose, filters, setFilters, applyFilters, resetFilters }) => {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  const [titleSearch, setTitleSearch] = useState('');

  const handleCheckboxChange = (category, item) => {
    setFilters(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item]
      }
    }));
  };

  const handleResetFilters = () => {
    resetFilters();
    setLocalSearchTerm('');
    setTitleSearch('');
  };

  const filterItems = (items) => {
    return Object.entries(items).filter(([key]) =>
      key.toLowerCase().includes(localSearchTerm.toLowerCase())
    );
  };

  const handleApplyFilters = () => {
    applyFilters({ ...filters, searchTerm: localSearchTerm, titleSearch });
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px] p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Filter</h2>
          <Button variant="ghost" onClick={handleResetFilters}>Reset</Button>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">SEARCH BY TITLE</h3>
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title"
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">DEPARTMENT</h3>
              <div className="relative mb-2">
             
             
              </div>
              {filterItems(filters.department).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`department-${key}`}
                    checked={value}
                    onCheckedChange={() => handleCheckboxChange('department', key)}
                  />
                  <label htmlFor={`department-${key}`} className="text-sm">{key}</label>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-semibold mb-2">DATA SUBJECT</h3>
              {filterItems(filters.dataSubjectType).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2 mb-2">
                  <Checkbox
                    id={`dataSubjectType-${key}`}
                    checked={value}
                    onCheckedChange={() => handleCheckboxChange('dataSubjectType', key)}
                  />
                  <label htmlFor={`dataSubjectType-${key}`} className="text-sm">{key}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t p-4">
          <Button 
            onClick={handleApplyFilters}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Apply Filter
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterModal;