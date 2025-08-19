import { PlusCircleIcon } from 'lucide-react';
import DoughnutChart from './../Charts/DognutChat';

// Define constants for reusability
const chartData = [
    { name: 'Requested', value: 20, color: '#fbbf24' },
    { name: 'Unrequested', value: 50, color: 'red' },
];

const quickActions = [
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 dark:text-blue-400"
            >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
        ),
        label: 'Email',
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 dark:text-blue-400"
            >
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
        ),
        label: 'Library',
    },
    {
        icon: (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-600 dark:text-blue-400"
            >
                <path d="M5 3a2 2 0 0 0-2 2" />
                <path d="M19 3a2 2 0 0 1 2 2" />
                <path d="M21 19a2 2 0 0 1-2 2" />
                <path d="M5 21a2 2 0 0 1-2-2" />
                <path d="M9 3h1" />
                <path d="M9 21h1" />
                <path d="M14 3h1" />
                <path d="M14 21h1" />
                <path d="M3 9v1" />
                <path d="M21 9v1" />
                <path d="M3 14v1" />
                <path d="M21 14v1" />
            </svg>
        ),
        label: 'Manually',
    },
];

const DashboardChart = ({
    userName = 'Marcos',
    totalBalance = 550.2,
    requestedAmount = 467.86,
    unrequestedAmount = 82.34,
}) => {
    return (
        <div className="p-6 mr-6 max-w-3xs mx-auto">
            {/* Header Section */}
            <header className="mb-10">
                <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
                    Hello {userName},
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    Take a look at your current balance
                </p>
            </header>

            {/* Main Content */}
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
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                Requested
                            </p>
                            <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                                {requestedAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                                Unrequested
                            </p>
                            <p className="text-lg font-semibold text-amber-500 dark:text-amber-400">
                                {unrequestedAmount.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'EUR',
                                })}
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

                {/* Quick Actions */}
                <div className="grid grid-cols-3 bg-gray-600 rounded-2xl px-6 gap-4 mt-6">
                    {quickActions.map((action, index) => (
                        <button
                            key={index}
                            className=" rounded-lg p-4 flex flex-col items-center  transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label={`Add expense via ${action.label}`}
                        >
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-2">
                                {action.icon}
                            </div>
                            <span className="text-blue-600 dark:text-blue-400 text-sm">
                                {action.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DashboardChart;