import { validateURL } from "./validation" //Import URL validation function
const fetch = require("node-fetch");

//Asynchronous function to post user sentiment analysis API request to the server-end
const retrieveNLPresults = async (APIRequest) => {

    console.log("Client request is: "+APIRequest)

    for(var ar in APIRequest) {
        console.log(ar + "=" + APIRequest[ar]);
    }

    const res = await fetch(
        'http://localhost:8081/apirequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(APIRequest),
        }
    )

    try{
        const APIResult = await res.json()
        return APIResult
    } catch (Error){
        console.log("ERROR MESSAGE: ", Error)
    }
}

// Function to update the client-end UI with the API results
function updateUI(APIObject){

    // Empty out any previous results
    const resultsHandle = document.getElementById('results')
    resultsHandle.innerHTML = '';

    // Create a div for each different type of result
    let scoreTagResult = document.createElement("div")
    scoreTagResult.setAttribute("id","scoreTagResult")
    scoreTagResult.innerHTML = "Score Tag: "+APIObject.resultScoretag
    let agreementResult = document.createElement("div")
    agreementResult.setAttribute("id","agreementResult")
    agreementResult.innerHTML = "Agreement: "+APIObject.resultAgreement
    let subjectivityResult = document.createElement("div")
    subjectivityResult.setAttribute("id","subjectivityResult")
    subjectivityResult.innerHTML = "Subjectivity: "+APIObject.resultSubjectivity
    let confidenceResult = document.createElement("div")
    confidenceResult.setAttribute("id","confidenceResult")
    confidenceResult.innerHTML = "Confidence Rating: "+APIObject.resultConfidence
    let ironyResult = document.createElement("div")
    ironyResult.setAttribute("id","ironyResult")
    ironyResult.innerHTML = "Irony: "+APIObject.resultIrony

    // Add divs under the result section
    resultsHandle.appendChild(scoreTagResult)
    resultsHandle.appendChild(agreementResult)
    resultsHandle.appendChild(subjectivityResult)
    resultsHandle.appendChild(confidenceResult)
    resultsHandle.appendChild(ironyResult)

}

// Function to execute when the user clicks on the submit button
function handleSubmit(event) {
    event.preventDefault()

    // Retrieve user's input
    const submittedURL = document.getElementById('url').value;

    // Run user's input through a validation test to check if it's an URL
    const validate = validateURL(submittedURL)

    // If it is an URL, send input over to the server-end
    if(validate==true){

        // Show an analysis pending bar
        const resultsHandle = document.getElementById('results')
        resultsHandle.innerHTML = '';
        let pendingAnalysis = document.createElement("div")
        pendingAnalysis.setAttribute("id","pendingAnalysis")
        pendingAnalysis.innerHTML = "Pending analysis, this may take up to a minute..."
        resultsHandle.appendChild(pendingAnalysis)

        retrieveNLPresults({submittedURL})
        .then(
            function(result){    
                updateUI(result)
            
            }  
        )

    // If it is not an URL, raise an alert for the user to key in the right information
    }else if(validate==false){

        alert("Please enter a valid URL")    
    }    
}

// Export handleSubmit function for the main index.js to use
export { handleSubmit }
export { retrieveNLPresults }