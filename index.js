const connectToMongoDB = require('./dbConnect');
const express = require('express')

connectToMongoDB();

const app = express()
const port = 5000

app.get('/', (req, res) => {
  res.send('Tanishka here!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})