// Including all dependencies

var path = require('path') // Provides utilities for working with file and directory paths

const mockAPIResponse = require('./mockAPI.js') // Using mockAPI.js for testing

const dotenv = require('dotenv'); // Module that loads environment variables from a .env file into process.env
dotenv.config();

const express = require('express') // Express to run server and routes
const app = express() // Start up an instance of app

// Creation of API object
var textapi = {
    application_key: process.env.API_KEY,
    application_URL: process.env.API_URL
};

const bodyParser = require('body-parser'); // Add body-parser dependencies
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

// Use Cors
const cors = require('cors'); // Add cors dependencies
app.use(cors());

// Initialize the "dist" folder
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// GET function for / root channel
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/test', function(req, res){
    console.log(req.body)
})
