import { FileDownIcon, PrinterIcon, ArrowDownIcon } from 'lucide-react';

const Toolbar = () => {
  return (
    <div className="flex gap-2">
      <button className="p-2 bg-blue-50 rounded-md">
        <FileDownIcon size={20} className="text-blue-600" />
      </button>
      <button className="p-2 bg-blue-50 rounded-md">
        <PrinterIcon size={20} className="text-blue-600" />
      </button>
      <button className="flex items-center gap-1 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm">
        Sort By <ArrowDownIcon size={16} />
      </button>
    </div>
  );
};

export default Toolbar;
