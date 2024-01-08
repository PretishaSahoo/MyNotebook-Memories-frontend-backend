const express = require('express');
const connectToMongo = require("./db");
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());


// Connect to MongoDB
connectToMongo()
  .then(() => {
    // Available Routes
    app.use('/api/auth', require('./routes/auth'));
    app.use('/api/notes', require('./routes/notes'));

    // Root route handler
    app.get('/', (req, res) => {
      res.send('Hello World!');
    });

    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error starting the app:', error);
  });
