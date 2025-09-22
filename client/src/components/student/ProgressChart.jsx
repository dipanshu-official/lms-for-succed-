import React from 'react';

function ProgressChart({ data }) {
  const maxHours = Math.max(...data.map(d => d.hours));

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between h-40 space-x-2">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div 
              className="w-full bg-gradient-to-t from-primary-500 to-primary-400 rounded-t-lg transition-all duration-500 hover:from-primary-600 hover:to-primary-500"
              style={{ 
                height: `${(item.hours / maxHours) * 100}%`,
                minHeight: '20px'
              }}
            ></div>
            <span className="text-xs font-medium text-gray-600 mt-2">{item.day}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <span className="text-sm font-semibold text-gray-900">{item.hours}h</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProgressChart;