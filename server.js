const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb'); // Add this line

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static('public'));
// MongoDB connection
const mongoURI = 'mongodb://localhost:27017'; // Replace with your MongoDB connection string
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Example: Insert a document into a collection
const db = client.db(); // Use the default database
const collection = db.collection('Restaurant'); // Replace with your collection name

// Handle the route for saving keys
app.post('/saveKey', (req, res) => {
  const pressedKey = req.body.key;

  // Insert the pressed key into MongoDB
  collection.insertOne({ key: pressedKey }, (err, result) => {
    if (err) {
      console.error('Error inserting document', err);
      res.status(500).send('Error saving key to MongoDB');
    } else {
      console.log('Document inserted:', result.ops[0]);
      res.status(200).send('Key saved successfully');
    }
  });
});

// Define your routes

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Add other routes as needed for your application

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
