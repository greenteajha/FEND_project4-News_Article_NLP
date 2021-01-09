// Including all dependencies
let fetch = require("node-fetch");

const dotenv = require('dotenv'); // Module that loads environment variables from a .env file into process.env
dotenv.config();

const express = require('express') // Express to run server and routes
const app = express() // Start up an instance of app

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
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

// GET function for / root channel
app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

/*app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})*/

app.post('/apirequest', async function(req, res){
    const submittedURL = encodeURI(req.body.submittedURL)
    console.log(textapi.application_URL)
    console.log(textapi.application_key)
    const fetchURL = textapi.application_URL+"?key="+textapi.application_key+"&of=json&url="+submittedURL+"&model=general&lang=en"
    
    console.log(fetchURL)

    const response = await fetch (fetchURL)

    let analysisResult = {}

    try{
        const data = await response.json()
        console.log(data.sentence_list)
        for (const text of data.sentence_list){

            analysisResult = {
                //resultText: text.text,
                resultConfidence: text.confidence,
                resultScoretag: text.score_tag,
                resultAgreement: text.agreement
            }
            
        }

        //console.log(analysisResult)
        res.send(analysisResult)
        
    } catch (Error){
        console.log("ERROR MESSAGE: ", Error)
    }

})
