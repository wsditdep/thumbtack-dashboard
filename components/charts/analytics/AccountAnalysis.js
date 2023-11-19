"use client";

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { accountType: 'Active', value: 150, color: '#00BFFF' },     // Blue
  { accountType: 'Frozen', value: 50, color: '#FFFF00' },      // Yellow
  { accountType: 'Suspended', value: 25, color: '#FF5733' },   // Red
];

const AccountTypeLineChart = () => {
  return (
    <ResponsiveContainer width="100%" height={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
        <XAxis dataKey="accountType" stroke="#FFF" />
        <YAxis stroke="#FFF" />
        <Tooltip contentStyle={{ background: '#222', border: '1px solid #555', color: '#FFF' }} />
        <Legend fill="#FFF" />
        {data.map((entry, index) => (
          <Line key={index} type="monotone" dataKey="value" stroke={entry.color} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AccountTypeLineChart;
