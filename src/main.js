const express = require('express');
const cors = require('cors');
const {connectDB} = require('./config/database');
const {router} = require('./routes/books');

const app = express();

// Enable CORS
app.use(cors());

app.use('/', express.json());
app.use('/api', router);

const PORT = process.env.PORT || 3001;

connectDB().then(() => {
  app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`);
  });
}); 