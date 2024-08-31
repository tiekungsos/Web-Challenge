import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const FilterModal = ({ isOpen, onClose, filters, setFilters, applyFilters, resetFilters }) => {
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
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>Filter Data</SheetTitle>
        </SheetHeader>
        <div className="space-y-4 mt-4">
          <div>
            <h3 className="font-semibold mb-2">Department</h3>
            {Object.entries(filters.department).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`department-${key}`}
                  checked={value}
                  onCheckedChange={() => handleCheckboxChange('department', key)}
                />
                <label htmlFor={`department-${key}`}>{key}</label>
              </div>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-2">Data Subject Type</h3>
            {Object.entries(filters.dataSubjectType).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={`dataSubjectType-${key}`}
                  checked={value}
                  onCheckedChange={() => handleCheckboxChange('dataSubjectType', key)}
                />
                <label htmlFor={`dataSubjectType-${key}`}>{key}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={handleResetFilters}>Reset</Button>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => { applyFilters(filters); onClose(); }}>Apply Filters</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default FilterModal;
