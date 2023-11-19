"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { date: '2023-08-01', visitors: 1500 },
  { date: '2023-08-02', visitors: 1800 },
  { date: '2023-08-03', visitors: 2200 },
  // ... other data
];

const darkThemeColors = {
  areaFill: 'rgba(136, 132, 216, 0.6)', // Light purple with some transparency
  areaStroke: '#8884d8', // Purple
  axisTick: '#ccc', // Light gray
  tooltipBackground: '#333', // Dark gray
  tooltipText: '#fff', // White
};

const Trafic = () => {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fill: darkThemeColors.axisTick }} />
          <YAxis tick={{ fill: darkThemeColors.axisTick }} />
          <Tooltip
            contentStyle={{
              backgroundColor: darkThemeColors.tooltipBackground,
              color: darkThemeColors.tooltipText,
            }}
          />
          <Legend />
          <Area
            type="monotone"
            dataKey="visitors"
            fill={darkThemeColors.areaFill}
            stroke={darkThemeColors.areaStroke}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Trafic;
