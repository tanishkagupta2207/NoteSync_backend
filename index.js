const connectToMongoDB = require('./dbConnect');
const express = require('express')
const cors = require('cors')

connectToMongoDB();

const app = express()
const port = 5000

app.use(express.json());
const corsOptions = {
  origin: 'https://note-sync-frontend.vercel.app',  // Only allow your frontend to access the backend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow GET and POST requests
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'],  // Allow these headers in requests
};

app.use(cors(corsOptions));

//Available routes
app.get("/", (req, res) => {
  res.json({ message: "Backend hosted on Vercel!" });
});
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`NoteSync Backend listening on port ${port}`)
})

module.exports = app;