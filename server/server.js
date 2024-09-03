const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const uri = process.env.MONGODB_URI;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
let db;
MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
    console.log("Connected to Database");
   
    
    db = client.db("SalesDB");
    console.log(db);
    
  })
  .catch((error) => console.error(error));

// API endpoint to fetch data
app.get("/data", async (req, res) => {
  try {
    const collection = db.collection("data");
    
    const data = await collection.find().toArray();
    
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
