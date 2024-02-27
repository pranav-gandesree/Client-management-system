import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

const BarDiagram = ({ totalAmount, amountSpent }) => {
  // Prepare data array
  const data = [ 
    { label: 'Total Amount', value: totalAmount },
    { label: 'Amount Spent', value: amountSpent }
  ];

  return (
    <BarChart
      width={500}
      height={300}
      series={[
        { data: data.map(item => item.value), label: 'Amount', id: 'amount' }
      ]}
      xAxis={[{ data: data.map(item => item.label), scaleType: 'band' }]}
    />
  );
};

export default BarDiagram;
