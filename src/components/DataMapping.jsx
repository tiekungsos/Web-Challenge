import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pencil,
  Trash2,
  Filter,
  FileDown,
  FileUp,
  Plus,
  ArrowUpDown,
  Eye,
  EyeOff,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const departmentMap = {
  "human-resources": "Human Resources",
  "it-is": "IT/IS",
  admission: "Admission",
};

const dataSubjectTypeMap = {
  employees: "Employees",
  "faculty-staff": "Faculty Staff",
  students: "Students",
};

export const DataMapping = ({
  data,
  onEdit,
  onDelete,
  onSort,
  sortConfig,
  visibleColumns,
  onToggleColumn,
}) => {
  const getSortIcon = (key) => {
    return sortConfig.direction === "ascending" ? (
      <ArrowUpDown className="ml-2 h-4 w-4" />
    ) : (
      <ArrowUpDown className="ml-2 h-4 w-4 rotate-180" />
    );
  };

  const columns = [
    { key: "title", label: "Title" },
    { key: "description", label: "Description" },
    { key: "department", label: "Department" },
    { key: "dataSubjectType", label: "Data Subject Type" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button variant="outline" className="text-green-600">
          <Pencil className="w-4 h-4 mr-2" />
          Edit
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Visualize
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {columns.map((column) => (
              <DropdownMenuItem
                key={column.key}
                onClick={() => onToggleColumn(column.key)}
              >
                {visibleColumns.includes(column.key) ? (
                  <Eye className="mr-2 h-4 w-4" />
                ) : (
                  <EyeOff className="mr-2 h-4 w-4" />
                )}
                {column.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="bg-white shadow rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(
                (column) =>
                  visibleColumns.includes(column.key) && (
                    <TableHead
                      key={column.key}
                      className="cursor-pointer group"
                      onClick={() => onSort(column.key)}
                    >
                      <div className="flex justify-between items-center">
                        {column.label}{" "}
                        <svg
                          width="25"
                          height="24"
                          viewBox="0 0 25 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10 10L12.6 7L15 10M10 14L12.6 17L15 14"
                            stroke="black"
                            stroke-opacity="0.45"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </div>
                    </TableHead>
                  )
              )}
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {visibleColumns.includes("title") && (
                  <TableCell>{item.title}</TableCell>
                )}
                {visibleColumns.includes("description") && (
                  <TableCell>{item.description}</TableCell>
                )}
                {visibleColumns.includes("department") && (
                  <TableCell>
                    {departmentMap[item.department] || item.department}
                  </TableCell>
                )}
                {visibleColumns.includes("dataSubjectType") && (
                  <TableCell>
                    {dataSubjectTypeMap[item.dataSubjectType] ||
                      item.dataSubjectType}
                  </TableCell>
                )}
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(item.id)}
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1_157)">
                          <path
                            d="M15.65 15.25H10.15M1.15002 15.25L5.40002 14.25L14.6929 4.95711C15.0834 4.56658 15.0834 3.93342 14.6929 3.54289L12.8571 1.70711C12.4666 1.31658 11.8334 1.31658 11.4429 1.70711L2.15002 11L1.15002 15.25Z"
                            stroke="black"
                            stroke-opacity="0.85"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_157">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.400024)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(item.id)}
                    >
                      <svg
                        width="17"
                        height="16"
                        viewBox="0 0 17 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clip-path="url(#clip0_1_160)">
                          <path
                            d="M3.15002 3.75L3.99117 13.4233C4.08104 14.4568 4.94624 15.25 5.98365 15.25H10.8164C11.8538 15.25 12.719 14.4568 12.8088 13.4233L13.65 3.75M6.15002 3.5V2.75C6.15002 1.64543 7.04542 0.75 8.15002 0.75H8.65002C9.75462 0.75 10.65 1.64543 10.65 2.75V3.5M1.40002 3.75H15.4"
                            stroke="#F5222D"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_160">
                            <rect
                              width="16"
                              height="16"
                              fill="white"
                              transform="translate(0.400024)"
                            />
                          </clipPath>
                        </defs>
                      </svg>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="text-sm text-gray-500 text-right p-3">
          Showing {data.length} of {data.length} results
        </div>
      </div>
    </div>
  );
};
