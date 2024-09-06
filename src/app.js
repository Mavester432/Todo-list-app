// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');  // Import routes for tasks
require('dotenv').config();  // Load environment variables from .env file

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Optional: Middleware to handle CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors());

// Use task routes for all requests starting with '/tasks'
app.use('/tasks', taskRoutes);

// Optional: Middleware to handle 404 errors for unknown routes
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handling middleware for catching unexpected errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });
