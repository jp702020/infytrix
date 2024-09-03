# Sales Dashboard Application

This is a Sales Dashboard Application built with a Node.js backend and a React frontend. The application fetches sales data from a MongoDB database and displays it using various charts and a data grid.

## Table of Contents

- [Installation](#installation)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [Running the Application](#running-the-application)
- [Features](#features)
- [Dependencies](#Dependencies)

# Installation

1. Clone the repository:

   ```bash
   git clone "uri"
2. Add some data of current date in salesDataWithDate.json file and upload it to MongoDB server
3. Set up your environment variables by creating a `.env` file in the root directory of the project. Add the following:
    ```bash
    MONGODB_URI=your_mongodb_uri
    PORT=5000
    //Replace `your_mongodb_uri` with the connection string for your MongoDB database.

# Backend Setup
1. Navigate to the server directory:
    ```bash
    cd server
2. Install the required dependencies:
    ```bash
    npm init -y
    npm install express body-parser
3. Start the server:
    ```bash
    node server.js

# Frontend Setup
1. Navigate to the client directory:
    ```bash
    cd client
    npx create-react-app .
2. Install the required dependencies:
    ```bash
    npm install chart.js react-chartjs-2 ag-grid-react ag-grid-community axios react-datepicker
3. Start the frontend:
    ```bash
    npm start


# Running the Application
1. Make sure both the backend server and the frontend client are running.
2. Open your browser and go to http://localhost:3000 to view the sales dashboard.
3.And for comparison go to http://localhost:3000/comparison

# Features
- Dashboard 1: Displays today's sales data by product and category using bar charts and a data grid.
- Dashboard 2: Allows comparison of sales data between two dates, with product-level and category-level comparisons.

# Dependencies
## Backend
- `express`: Web framework for Node.js.
- `mongodb`: MongoDB driver for Node.js.
- `dotenv`: Loads environment variables from a .env file.
- `cors`: Middleware for handling Cross-Origin Resource Sharing.
- `body-parser`: Middleware for parsing incoming request bodies.

## Frontend
- `react`: JavaScript library for building user interfaces.
- `react-chartjs-2` and `chart.js`: Libraries for rendering charts.
- `ag-grid-react` and `ag-grid-community`: Libraries for displaying data in a grid.
- `axios`: HTTP client for making API requests.
- `react-datepicker`: Component for selecting dates.