const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path')

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
app.use('/api/user', require('./route/user'));
app.use('/api/auth', require('./route/auth'));

//Server static asset in production
//check if the neviroment is production
if(process.env.NODE_ENV === 'production' ) {
  //Set static folder (client folder)
  app.use(express.static('client/build'))
}

//create route that will load index.html on build
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'client', 'build', 'index.html')))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`The server is running ${PORT}`));
