import { Calendar, ChevronDownIcon, FilterIcon, SearchIcon } from "lucide-react";
import { useState } from "react";

export default function ExpenseHeader() {

  const [dateRange, setDateRange] = useState('All expenses');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [searchQuery, setSearchQuery] = useState('');


    return (
        <div className="flex justify-between space-x-3">
        <h1 className="text-2xl font-bold mb-4 md:mb-0 text-gray-900 dark:text-white">
           Expenses
        </h1>
        <div className="flex space-x-3">
          <div className="relative">
            <input type="text" placeholder="Search expenses by id..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-900 w-full md:w-auto" />
            <SearchIcon size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>{ }
          <div className="relative">
            <button className="flex items-center px-4 py-2 bg-blue-950 rounded-lg">
              <Calendar size={18} className="mr-2 text-gray-500" />
              <span>{dateRange}</span>
              <ChevronDownIcon size={18} className="ml-2 text-gray-500" />
            </button>
          </div>
          <div className="relative">
            <button className="flex items-center px-4 py-2 bg-blue-950 rounded-lg">
              <FilterIcon size={18} className="mr-2 text-gray-500" />
              <span>{selectedCategory}</span>
              <ChevronDownIcon size={18} className="ml-2 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    )
}