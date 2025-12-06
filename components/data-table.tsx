'use client';

import React, { useState, useMemo } from 'react';

/** Defines the structure of a column in the data table, including key, label, and optional properties for sorting and rendering. */
export interface TableColumn<T> {
  key: keyof T;
  label: string;
  sortable?: boolean;
  render?: (value: any, row: T) => React.ReactNode;
}
/** @interface DataTableProps
 * Defines the properties for the DataTable component, including data, columns, page size, and search options.
 */
/** Defines the properties for the DataTable component, including data, columns, page size, and search options. */

export interface DataTableProps<T> {
  data: T[];
  /**
 * Renders a data table with pagination, sorting, and optional search functionality.
 * Accepts data and configuration through props.
 */
  columns: TableColumn<T>[];
  pageSize?: number;
  searchable?: boolean;
  searchFields?: (keyof T)[];
/** Renders a data table with pagination, sorting, and optional search functionality. Accepts data and configuration through props. */
}

/** @constant currentPage
 * Tracks the current page in the paginated data table.
 */
export function DataTable<T extends Record<string, any>>({
  /** @constant sortColumn
 * Stores the column key for the current sorting criteria.
 */
  data,
  /** @constant sortDirection
 * Indicates the sorting direction ('asc' for ascending, 'desc' for descending).
 */
  columns,
  /** @constant searchQuery
 * Contains the query string for searching the data table.
 */
  pageSize = 10,
  searchable = false,
  /** @constant filteredData
 * Memoized value of data filtered based on search query and sort criteria.
 */
  searchFields
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = useMemo(() => {
    let result = [...data];

    if (searchable && searchQuery && searchFields) {
      const query = searchQuery.toLowerCase();
      result = result.filter(row =>
        searchFields.some(field => {
          const value = row[field];
          return value?.toString().toLowerCase().includes(query);
        })
      );
    }

    if (sortColumn) {
      result.sort((a, b) => {
        /** @constant paginatedData
 * Memoized value of data divided into pages for pagination.
 */
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        /** @constant totalPages
 * Calculates the total number of pages based on the filtered data length and page size.
 */
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      /** @function handleSort
 * Handles sorting when a sortable column header is clicked.
 */
      });
    }

    return result;
  }, [data, searchQuery, searchFields, searchable, sortColumn, sortDirection]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return filteredData.slice(startIndex, startIndex + pageSize);
  }, [filteredData, currentPage, pageSize]);
/** @function handlePageChange
 * Handles pagination by changing the current page within bounds.
 */

  const totalPages = Math.ceil(filteredData.length / pageSize);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="w-full">
      {searchable && (
        <div className="mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search..."
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              {columns.map((column) => (
                <th
                  key={String(column.key)}
                  className="border px-4 py-2 text-left cursor-pointer hover:bg-gray-200"
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  {column.label}
                  {sortColumn === column.key && (
                    <span className="ml-2">
                      {sortDirection === 'asc' ? '↑' : '↓'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={String(column.key)} className="border px-4 py-2">
                    {column.render
                      ? column.render(row[column.key], row)
                      : String(row[column.key] ?? '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-4 flex justify-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
