//Loading Express and its instance
const express = require('express');
const session = require("express-session")
const MongoStore = require("connect-mongo")
const app = express();

//Load CORS to have less headaches...
const cors = require("cors")
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials:true
};
app.use(cors(corsOptions));

//Load DotEnv and the current variables
const dotEnv = require("dotenv")
dotEnv.config()

//Set Up Sessions
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
    store: MongoStore.create({
        mongoUrl: process.env.DATABASE_URL,
        collectionName:"SpotNetSessions"
    }), 
    
    cookie:{
        secure: false,
        httpOnly:true,
        maxAge: 1000 * 60 * 60 * 24,
        name:'Spotnetcookie'
    }
    
}))
app.use((req, res, next) => {
    console.log("Session Data:", req.session);
    next();
});

const PORT = process.env.PORT || 3069;
const DATABASE_URL = process.env.DATABASE_URL;
//console.log(DATABASE_URL)
// Express native JSON body parser
app.use(express.json());

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



