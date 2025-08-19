const DoughnutChart = ({
  data,
  total
}) => {
  // Calculate the total value from the data
  const totalValue = data.reduce((acc, item) => acc + item.value, 0);
  // Calculate the circumference of the circle
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  // Calculate the stroke-dasharray and stroke-dashoffset for each segment
  let accumulatedPercentage = 0;
  const segments = data.map(item => {
    const percentage = item.value / totalValue * 100;
    const dashArray = percentage / 100 * circumference;
    const dashOffset = (100 - accumulatedPercentage) / 100 * circumference;
    accumulatedPercentage += percentage;
    return {
      ...item,
      percentage,
      dashArray,
      dashOffset
    };
  });
  return <div className="relative w-full aspect-square">
      <svg viewBox="5 10 20 30" className="w-full overflow-visible h-full">
        {/* Background circle */}
        <circle cx="18" cy="18" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="3" />
        {/* Data segments */}
        {segments.map((segment, index) => <circle key={index} cx="18" cy="18" r={radius} fill="none" stroke={segment.color} strokeWidth="3" strokeDasharray={`${segment.dashArray} ${circumference - segment.dashArray}`} strokeDashoffset={segment.dashOffset} transform="rotate(-90 18 18)" strokeLinecap="round" />)}
        {/* Center text */}
        <text x="18" y="16" textAnchor="middle" fontSize="0.25rem" fill="#9ca3af">
          Total
        </text>
        <text x="18" y="20" textAnchor="middle" fontSize="0.35rem" fontWeight="bold">
          {total}€
        </text>
      </svg>
    </div>;
};
export default DoughnutChart;