import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchSalesDataByDate } from '../api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard2 = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const start = startDate.toISOString().split('T')[0];
      const end = endDate.toISOString().split('T')[0];
      const startData = await fetchSalesDataByDate(start);
      const endData = await fetchSalesDataByDate(end);

      const mergedData = [...startData, ...endData];
      setSalesData(mergedData);
    };

    if (startDate && endDate) {
      getData();
    }
  }, [startDate, endDate]);

  const products = [...new Set(salesData.map(item => item.productName))]; 
  const categories = [...new Set(salesData.map(item => item.category))];

  const productComparison = products.map(product => {
    const startSales = salesData.find(item => item.productName === product && item.date === startDate.toISOString().split('T')[0]);
    const endSales = salesData.find(item => item.productName === product && item.date === endDate.toISOString().split('T')[0]);

    return {
      product,
      startSales: startSales ? startSales.salesAmount : 0,
      endSales: endSales ? endSales.salesAmount : 0,
      difference: (endSales ? endSales.salesAmount : 0) - (startSales ? startSales.salesAmount : 0),
    };
  });

  const categoryComparison = categories.map(category => {
    const startSales = salesData.filter(item => item.category === category && item.date === startDate.toISOString().split('T')[0]).reduce((sum, item) => sum + item.salesAmount, 0);
    const endSales = salesData.filter(item => item.category === category && item.date === endDate.toISOString().split('T')[0]).reduce((sum, item) => sum + item.salesAmount, 0);

    return {
      category,
      startSales,
      endSales,
      difference: endSales - startSales,
    };
  });

  const productChartData = {
    labels: productComparison.map(item => item.product),
    datasets: [
      {
        label: `Sales on ${startDate.toISOString().split('T')[0]}`,
        data: productComparison.map(item => item.startSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: `Sales on ${endDate.toISOString().split('T')[0]}`,
        data: productComparison.map(item => item.endSales),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        type: 'bar',
      },
    ],
  };

  const categoryChartData = {
    labels: categoryComparison.map(item => item.category),
    datasets: [
      {
        label: `Sales on ${startDate.toISOString().split('T')[0]}`,
        data: categoryComparison.map(item => item.startSales),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        type: 'bar',
      },
      {
        label: `Sales on ${endDate.toISOString().split('T')[0]}`,
        data: categoryComparison.map(item => item.endSales),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
        type: 'bar',
      },
    ],
  };

  const columns = [
    { headerName: 'Product Name', field: 'product' },
    { headerName: 'Category', field: 'category' },
    { headerName: `Date 1 Sales Amount`, field: 'startSales' },
    { headerName: `Date 2 Sales Amount`, field: 'endSales' },
    { headerName: 'Difference', field: 'difference' },
  ];

  const rowData = productComparison;

  return (
    <div>
      <h2>Sales Comparison</h2>
      <div>
        <DatePicker selected={startDate} onChange={date => setStartDate(date)} />
        <DatePicker selected={endDate} onChange={date => setEndDate(date)} />
      </div>
      <div>
        <h3>Product-Level Comparison</h3>
        <Bar data={productChartData} />
      </div>
      <div>
        <h3>Category-Level Comparison</h3>
        <Bar data={categoryChartData} />
      </div>
      <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columns}
          pagination
          paginationPageSize={10}
          sortable
          filterable
        />
      </div>
    </div>
  );
};

export default Dashboard2;
