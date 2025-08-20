import { PlusCircleIcon } from 'lucide-react';
import DoughnutChart from './../Charts/DognutChat';

// Define constants for reusability
const chartData = [
    { name: 'Restant', value: 20, color: '#fbbf24' },
    { name: 'Dépensé', value: 50, color: 'blue' },
];


const DashboardChart = ({
    userName = 'You',
    totalBalance = chartData[0].value + chartData[1].value,
    requestedAmount = chartData[0],
    unrequestedAmount = chartData[1],
}) => {
    return (
        <div className="p-6 mr-6 max-w-3xs  mx-auto">
            {/* Header Section */}
            <header className="mb-5">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    Hello {userName},
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Take a look at your current balance
                </p>
            </header>

            {/* Main Content */}
            <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    {chartData[0].name}
                </p>
                <p className={`text-lg font-semibold text-amber-600`}>
                    {chartData[0].value}
                </p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Chart Section */}
                <section className="lg:w-1/2 flex items-center justify-center">
                    <div className="overflow-visible">
                        <DoughnutChart data={chartData} total={totalBalance} />
                    </div>
                </section>

                {/* Metrics and Actions Section */}
                <section className="lg:w-1/2 flex flex-col justify-center">
                    <div className="space-y-4 mb-6">

                        <div className='mt-28 '>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {chartData[1].name}
                            </p>
                            <p className={`text-lg font-semibold text-${chartData[1].color}-600`}>
                                {chartData[1].value}
                            </p>
                        </div>
                    </div>
                </section>

            </div>
            <div className="-ml-4">
                {/* Action Button */}
                <button
                    className="flex items-center justify-center w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Add a new expense"
                >
                    <PlusCircleIcon size={20} className="mr-2" />
                    Add a New Expense
                </button>
            </div>
        </div>
    );
};

export default DashboardChart;