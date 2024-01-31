// app.js

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

app.use(express.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// Define routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/menu', (req, res) => {
  res.sendFile(__dirname + '/public/menu.html');
});

// Add more routes for other pages

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
