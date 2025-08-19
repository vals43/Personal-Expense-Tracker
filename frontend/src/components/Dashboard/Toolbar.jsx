import { FileDownIcon, PrinterIcon, ChevronDown } from 'lucide-react';

const Toolbar = () => {
  return (
    <div className="flex gap-2">
      <button className="p-2 bg-gray-300 rounded-md">
        <FileDownIcon size={20} className="text-blue-600" />
      </button>
      <button className="p-2 bg-gray-300 rounded-md">
        <PrinterIcon size={20} className="text-blue-600" />
      </button>
      <button className="flex items-center gap-1 px-3 py-2 bg-gray-300 border border-gray-200 text-gray-900 rounded-md text-sm">
        Sort By <ChevronDown size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
