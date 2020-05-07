const express = require('express');
const app = express();
const connectDB = require('./config/db');

//Connect our mongoose with database
connectDB();

//Body Parser Middleware
app.use(express.json()); //to handle json file
app.use(express.urlencoded({ extended: false }));

//Routes
app.use('/api/days', require('./route/days'));
app.use('/api/weeks', require('./route/weeks'));
app.use('/api/months', require('./route/months'));
app.use('/api/quarters', require('./route/quarters'));
app.use('/api/years', require('./route/years'));
app.use('/api/users', require('./route/users'));
app.use('/api/auth', require('./route/auth'));
//Home
app.get('/', (req, res) => {
  console.log(req.headers.codigo);
  res.send('Hello world');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running ${PORT}`));
