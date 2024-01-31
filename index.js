const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoURI = 'mongodb://ttsuser:MhNCJt97ZlEL4zdOyNWjuvhOfkoOjOoIgj0YRf8LIoSihbpGFh9sBhiVSGfUhaU6zMBwAqKc9WoZACDbC8sxWQ==@ttsuser.mongo.cosmos.azure.com:10255/?ssl=true&replicaSet=globaldb&retrywrites=false&maxIdleTimeMS=120000&appName=@ttsuser@'; // MongoDB connection string
const client = new MongoClient(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

let IndianRestaurant;
let Restaurant;

client.connect().then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
  client.close().then(() => {
    console.log('MongoDB connection closed');
    process.exit(0);
  });
});
