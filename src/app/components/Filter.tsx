"use client";
import { useState } from "react";
import { Bed,  Car, Trees } from "lucide-react";
import { FaToilet } from "react-icons/fa6";
import MaxWidthWrapper from "./MaxWidthWrapper";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

export default function PropertySearchFilter() {
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{
    bedrooms: string;
    bathrooms: string;
    garden: string;
    parking: string;
    availableMonthYear: Date | null;
  }>({
    bedrooms: "",
    bathrooms: "",
    garden: "",
    parking: "",
    availableMonthYear: null,
  });

  return (
    <div className="bg-transparent py-12 mt-[-100px] relative z-100">
      <MaxWidthWrapper>
        {/* Search and Filter Section */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-daffodilYellow shadow-md">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <svg
                className="w-5 h-5 text-daffodilYellow mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              Refine Your Search
            </h3>
            <button
              onClick={() => {
                setSearch("");
                setFilters({
                  bedrooms: "",
                  bathrooms: "",
                  garden: "",
                  parking: "",
                  availableMonthYear: null,
                });
              }}
              className="text-sm text-gray-500 hover:text-daffodilYellow transition-colors mt-2 md:mt-0 flex items-center"
              aria-label="Reset all filters"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Reset All
            </button>
          </div>

          {/* Search Input - Full width */}
          <div className="mb-6">
            <label htmlFor="search" className="sr-only">
              Search Properties
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="search"
                className="block w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm"
                placeholder="Search by location, property name, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search properties"
              />
            </div>
          </div>

          {/* Filter Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:pl-12">
            {/* Bedrooms */}
            <div className="flex flex-col">
              <label htmlFor="bedrooms" className="block text-xs font-medium text-gray-500 mb-1">
                Bedrooms
              </label>
              <div className="relative flex-1">
                <select
                  id="bedrooms"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.bedrooms}
                  onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Bed className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="flex flex-col">
              <label htmlFor="bathrooms" className="block text-xs font-medium text-gray-500 mb-1">
                Bathrooms
              </label>
              <div className="relative flex-1">
                <select
                  id="bathrooms"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.bathrooms}
                  onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaToilet className="h-3 w-3 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Garden */}
            <div className="flex flex-col">
              <label htmlFor="garden" className="block text-xs font-medium text-gray-500 mb-1">
                Garden
              </label>
              <div className="relative flex-1">
                <select
                  id="garden"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.garden}
                  onChange={(e) => setFilters({ ...filters, garden: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Trees className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Parking */}
            <div className="flex flex-col">
              <label htmlFor="parking" className="block text-xs font-medium text-gray-500 mb-1">
                Parking
              </label>
              <div className="relative flex-1">
                <select
                  id="parking"
                  className="block w-full py-2.5 pl-3 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                  value={filters.parking}
                  onChange={(e) => setFilters({ ...filters, parking: e.target.value })}
                >
                  <option value="">Any</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <Car className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Available From */}
            <div className="flex flex-col col-span-2 md:col-span-2">
              <label htmlFor="available" className="block text-xs font-medium text-gray-500 mb-1">
                Available From
              </label>
              <div className="relative flex-1">
                <DatePicker
                  id="available"
                  selected={filters.availableMonthYear}
                  onChange={(date: Date | null) => setFilters({ ...filters, availableMonthYear: date })}
                  dateFormat="MMMM yyyy"
                  showMonthYearPicker
                  placeholderText="Select month"
                  className="block w-full py-2.5 pl-10 pr-8 rounded-lg border border-gray-200 focus:ring-2 focus:ring-daffodilYellow focus:border-daffodilYellow transition-all shadow-sm appearance-none bg-white"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}