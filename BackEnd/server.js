//Loading Express and its instance
const express = require('express');
const app = express();

//Load DotEnv and the current variables
const dotEnv = require("dotenv")
dotEnv.config()
const PORT = process.env.PORT || 3069;
const DATABASE_URL = process.env.DATABASE_URL;

// Express native JSON body parser
app.use(express.json());
//Load CORS to have less headaches...
const cors = require("cors")
app.use(cors());


//Loading Morgan to log HTTP requests
const morgan = require('morgan')
app.use(morgan('dev'));


//Defining base route
const routes= require("./src/routes")
app.use('/api', routes);

//Loading Mongoose Yay! I'm a MERN Dev...
const mongoose = require('mongoose');

//Connect to MongoDB
mongoose.connect(DATABASE_URL);

const db = mongoose.connection;
db.on('error', error => {
    console.error("Database connection error:", error);
});
db.once('open', () => {
    console.log('Database Connected');
});


//Finally have the server listen on the defined port. Nice!
app.listen(PORT, ()=>{
    console.log( `Server running on port ${PORT}`)
})



