import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import FilterModal from "../components/FilterModal";
import { DataMapping } from "../components/DataMapping";
import Layout from "../components/Layout";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PlusCircle,
  Filter,
  FileDown,
  FileUp,
  Pencil,
  Eye,
} from "lucide-react";

const departmentMap = {
  "human-resources": "Human Resources",
  "it-is": "IT/IS",
  admission: "Admission",
  marketing: "Marketing",
};

const dataSubjectTypeMap = {
  employees: "Employees",
  "faculty-staff": "Faculty Staff",
  students: "Students",
};

const Index = () => {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentData, setCurrentData] = useState({
    id: null,
    title: "",
    description: "",
    department: "",
    dataSubjectType: "",
  });
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    department: {
      "Human Resources": false,
      "IT/IS": false,
      Admission: false,
      Marketing: false,
    },
    dataSubjectType: {
      Employees: false,
      "Faculty Staff": false,
      Students: false,
    },
  });
  const [storedData, setStoredData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });
  const [visibleColumns, setVisibleColumns] = useState([
    "title",
    "description",
    "department",
    "dataSubjectType",
  ]);

  const handleSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setFilteredData(sortedData);
  };

  const handleToggleColumn = (columnKey) => {
    setVisibleColumns((prev) =>
      prev.includes(columnKey)
        ? prev.filter((key) => key !== columnKey)
        : [...prev, columnKey]
    );
  };

  useEffect(() => {
    const data = localStorage.getItem("userData");
    if (data) {
      const parsedData = JSON.parse(data);
      setStoredData(parsedData);
      setFilteredData(parsedData);
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setCurrentData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let updatedData;
    if (isEditing) {
      updatedData = storedData.map((item) =>
        item.id === currentData.id ? currentData : item
      );
    } else {
      updatedData = [...storedData, { ...currentData, id: Date.now() }];
    }
    setStoredData(updatedData);
    setFilteredData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
    setOpen(false);
    setCurrentData({
      id: null,
      title: "",
      description: "",
      department: "",
      dataSubjectType: "",
    });
    setIsEditing(false);
  };

  const handleEdit = (id) => {
    const itemToEdit = storedData.find((item) => item.id === id);
    if (itemToEdit) {
      setCurrentData(itemToEdit);
      setIsEditing(true);
      setOpen(true);
    }
  };

  const handleDelete = (id) => {
    const updatedData = storedData.filter((item) => item.id !== id);
    setStoredData(updatedData);
    setFilteredData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));
  };

  const applyFilters = (appliedFilters) => {
    const filteredResults = storedData.filter((item) => {
      const departmentMatch = Object.entries(appliedFilters.department).every(
        ([key, value]) => {
          return !value || departmentMap[item.department] === key;
        }
      );
      const dataSubjectTypeMatch = Object.entries(
        appliedFilters.dataSubjectType
      ).every(([key, value]) => {
        return !value || dataSubjectTypeMap[item.dataSubjectType] === key;
      });
      return departmentMatch && dataSubjectTypeMatch;
    });
    setFilteredData(filteredResults);
  };

  const resetFilters = () => {
    const resetFilters = {
      department: Object.fromEntries(
        Object.keys(filters.department).map((key) => [key, false])
      ),
      dataSubjectType: Object.fromEntries(
        Object.keys(filters.dataSubjectType).map((key) => [key, false])
      ),
    };
    setFilters(resetFilters);
    setFilteredData(storedData);
  };

  return (
    <Layout>
      <div className="flex flex-col space-y-4">
      <div class="flex justify-start items-center">
            <span class="mr-[8px]">
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2.75024 15.2502H13.2502C14.3548 15.2502 15.2502 14.3548 15.2502 13.2502V5.75025L8.0002 0.750244L0.750244 5.75025V13.2502C0.750244 14.3548 1.64568 15.2502 2.75024 15.2502Z"
                stroke="black"
                stroke-opacity="0.85"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M5.74963 11.7493C5.74963 10.6447 6.6451 9.7493 7.7496 9.7493H8.2496C9.3542 9.7493 10.2496 10.6447 10.2496 11.7493V15.2493H5.74963V11.7493Z"
                stroke="black"
                stroke-opacity="0.85"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            </span> <span class=" text-[#bfbfbf]">/ Current path</span>
          </div>
        <div className="flex flex-wrap lg:flex-nowrap justify-between items-center">
         
          <div className="sm:w-screen"><h1 className="text-2xl font-bold ">Data Mapping</h1></div>
          <div className="flex space-x-2 mt-1 lg:mt-0">
            <Button
              variant="outline"
              onClick={() => setIsFilterModalOpen(true)}
            >
              <span class="pr-1">
                <svg
                  width="16"
                  height="10"
                  viewBox="0 0 16 10"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.75 0C0.33579 0 0 0.33579 0 0.75C0 1.16421 0.33579 1.5 0.75 1.5V0ZM15.25 1.5C15.6642 1.5 16 1.16421 16 0.75C16 0.33579 15.6642 0 15.25 0V1.5ZM0.75 1.5H15.25V0H0.75V1.5Z"
                    fill="black"
                    fill-opacity="0.85"
                  />
                  <path
                    d="M2.75 4C2.33579 4 2 4.3358 2 4.75C2 5.1642 2.33579 5.5 2.75 5.5V4ZM13.25 5.5C13.6642 5.5 14 5.1642 14 4.75C14 4.3358 13.6642 4 13.25 4V5.5ZM2.75 5.5H13.25V4H2.75V5.5Z"
                    fill="black"
                    fill-opacity="0.85"
                  />
                  <path
                    d="M4.75 8C4.33579 8 4 8.3358 4 8.75C4 9.1642 4.33579 9.5 4.75 9.5V8ZM11.25 9.5C11.6642 9.5 12 9.1642 12 8.75C12 8.3358 11.6642 8 11.25 8V9.5ZM4.75 9.5H11.25V8H4.75V9.5Z"
                    fill="black"
                    fill-opacity="0.85"
                  />
                </svg>
              </span>
              
              <span class="hidden lg:block">Filter</span>
            </Button>
            <Button variant="outline">
              <span class="pr-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.75 15.25H13.25M8 0.75V11.25M8 11.25L3.75 6.75M8 11.25L12.25 6.75"
                    stroke="black"
                    stroke-opacity="0.85"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
              
              <span class="hidden lg:block">Export</span>
            </Button>
            <Button variant="outline">
              <span class="pr-1">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.75 15.25H13.25M8 11.25V0.75M8 0.75L3.75 5.25M8 0.75L12.25 5.25"
                    stroke="black"
                    stroke-opacity="0.85"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span> 
              <span class="hidden lg:block">Import</span>
            </Button>
            <Button
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setOpen(true)}
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              New Data
            </Button>
          </div>
        </div>
        <div className="flex space-x-2">
          <Button variant="default" className="bg-green-600 hover:bg-green-700">
            Data Mapping
          </Button>
          <Button variant="ghost">Collection Sources</Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="right" className="w-full sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>
                {isEditing ? "Edit Data" : "Add New Data"}
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={currentData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  name="description"
                  value={currentData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select
                  name="department"
                  onValueChange={(value) =>
                    handleSelectChange("department", value)
                  }
                  value={currentData.department}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="human-resources">
                      Human Resources
                    </SelectItem>
                    <SelectItem value="it-is">IT/IS</SelectItem>
                    <SelectItem value="admission">Admission</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dataSubjectType">Data Subject Type</Label>
                <Select
                  name="dataSubjectType"
                  onValueChange={(value) =>
                    handleSelectChange("dataSubjectType", value)
                  }
                  value={currentData.dataSubjectType}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Data Subject Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employees">Employees</SelectItem>
                    <SelectItem value="faculty-staff">Faculty Staff</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                {isEditing ? "Update Data" : "Add Data"}
              </Button>
            </form>
          </SheetContent>
        </Sheet>
        <DataMapping
          data={filteredData}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSort={handleSort}
          sortConfig={sortConfig}
          visibleColumns={visibleColumns}
          onToggleColumn={handleToggleColumn}
        />
      </div>
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        filters={filters}
        setFilters={setFilters}
        applyFilters={applyFilters}
        resetFilters={resetFilters}
      />
    </Layout>
  );
};

export default Index;
