const connectToMongo = require('./app/config/db');
const cors = require('cors');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(cors());
app.use(express.json())

// Available Routes
app.use('/api/user', require('./app/routes/User.routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})