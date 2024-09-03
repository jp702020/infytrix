import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement } from 'chart.js';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { fetchSalesData } from '../api';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement);

const Dashboard1 = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchSalesData();
      setSalesData(data);
    };

    getData();
  }, []);

  const today = new Date().toISOString().split('T')[0];

  
  const productData = salesData.filter(item => item.date === today);
  const products = [...new Set(productData.map(item => item.productName))];
  const categories = [...new Set(productData.map(item => item.category))];

  const productSales = products.map(product => ({
    product,
    sales: productData.filter(item => item.productName === product).reduce((sum, item) => sum + item.salesAmount, 0),
  }));

  const categorySales = categories.map(category => ({
    category,
    sales: productData.filter(item => item.category === category).reduce((sum, item) => sum + item.salesAmount, 0),
  }));

  const productChartData = {
    labels: productSales.map(item => item.product),
    datasets: [{
      label: 'Sales by Product',
      data: productSales.map(item => item.sales),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  const categoryChartData = {
    labels: categorySales.map(item => item.category),
    datasets: [{
      label: 'Sales by Category',
      data: categorySales.map(item => item.sales),
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
    }],
  };

  const columns = [
    { headerName: 'Product Name', field: 'productName' }, 
    { headerName: 'Category', field: 'category' },
    { headerName: 'Quantity Sold', field: 'quantitySold' },
    { headerName: 'Sales Amount', field: 'salesAmount' },
  ];

  const rowData = productData.map(item => ({
    ...item,
    quantitySold: item.quantitySold,
    salesAmount: item.salesAmount,
  }));

  return (
    <div>
      <h2>Today's Sales</h2>
      <div>
        <h3>Product-Level Graph</h3>
        <Bar data={productChartData} />
      </div>
      <div>
        <h3>Category-Level Graph</h3>
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

export default Dashboard1;
