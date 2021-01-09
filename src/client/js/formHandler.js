import { validateURL } from "./validation" //Import URL validation function

//Asynchronous function to post user sentiment analysis API request to the server-end
const retrieveNLPresults = async (APIRequest) => {
    const res = await fetch(
        '/apirequest', {
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
    let confidenceResult = document.createElement("div")
    confidenceResult.setAttribute("id","confidenceResult")
    confidenceResult.innerHTML = APIObject.resultConfidence
    let confidenceScoreTag = document.createElement("div")
    confidenceScoreTag.setAttribute("id","confidenceResult")
    confidenceScoreTag.innerHTML = APIObject.resultScoretag
    let confidenceAgreement = document.createElement("div")
    confidenceAgreement.setAttribute("id","confidenceResult")
    confidenceAgreement.innerHTML = APIObject.resultAgreement

    // Add this under the result section
    resultsHandle.appendChild(confidenceResult)
    resultsHandle.appendChild(confidenceScoreTag)
    resultsHandle.appendChild(confidenceAgreement)
    
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
