const connectToMongoDB = require('./dbConnect');
const express = require('express')
const cors = require('cors')

connectToMongoDB();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`NoteSync Backend listening on port ${port}`)
})