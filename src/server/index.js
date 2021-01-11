// Including all dependencies
let fetch = require("node-fetch");

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
const { TestScheduler } = require('jest');
app.use(cors());

// Initialize the "dist" folder
app.use(express.static('dist'));

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})


/*// GET function for / root channel
app.get('/', function (req, res) {
    res.sendFile('../dist/index.html')
})*/

app.get('/', function (req, res) {
    res.sendFile(path.resolve('src/client/views/index.htmll'))
})

// Use asynchronous function to:
// 1. Receive client request
// 2. Craft API POST request
// 3. Send in API POST request
// 4. Receive API POST response and send it back to the client
app.post('/apirequest', async function(req, res){

    console.log("ONE!")

    // Encode client request
    const submittedURL = encodeURI(req.body.submittedURL)
    // Craft API POST request
    const fetchURL = textapi.application_URL+"?key="+textapi.application_key+"&of=json&url="+submittedURL+"&model=general&lang=en"
    console.log(fetchURL)
    // Submit API POST and wait for response
    const response = await fetch (fetchURL)

    let analysisResult = {}

    try{

        // Store response into an object to send back to the client-side
        const data = await response.json()
        console.log(data.sentence_list)
        for (const text of data.sentence_list){

            analysisResult = {
                resultConfidence: text.confidence,
                resultScoretag: text.score_tag,
                resultAgreement: text.agreement
            }
            
        }

        // Send response back to the client-side
        res.send(analysisResult)
        
    } catch (Error){
        console.log("ERROR MESSAGE: ", Error)
    }

})
