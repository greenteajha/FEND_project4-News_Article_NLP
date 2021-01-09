import { validateURL } from "./validation" //Import URL validation function

//Posts user sentiment analysis API request to Meaningcloud
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

function updateUI(APIObject){
    const resultsHandle = document.getElementById('results')
    console.log(APIObject)

    /*let confidenceText = document.createElement("div")
    confidenceText.setAttribute("id","confidenceText")
    confidenceText.innerHTML = APIObject.resultText*/
    let confidenceResult = document.createElement("div")
    confidenceResult.setAttribute("id","confidenceResult")
    confidenceResult.innerHTML = APIObject.resultConfidence
    let confidenceScoreTag = document.createElement("div")
    confidenceScoreTag.setAttribute("id","confidenceResult")
    confidenceScoreTag.innerHTML = APIObject.resultScoretag
    let confidenceAgreement = document.createElement("div")
    confidenceAgreement.setAttribute("id","confidenceResult")
    confidenceAgreement.innerHTML = APIObject.resultAgreement
    //resultsHandle.appendChild(confidenceText)
    resultsHandle.appendChild(confidenceResult)
    resultsHandle.appendChild(confidenceScoreTag)
    resultsHandle.appendChild(confidenceAgreement)
    
}

function handleSubmit(event) {
    event.preventDefault()

    const submittedURL = document.getElementById('url').value;

    const validate = validateURL(submittedURL)

    //console.log(validate)

    if(validate==true){
        console.log("It is the URL")
    }else if(validate==false){
        alert("Please enter a valid URL")
    }else{
        console.log("ERROR")
    }

    //console.log(submittedURL)
    retrieveNLPresults({submittedURL})
    .then(
        function(result){
            //console.log(result)

            updateUI(result)
        }

    )
}

export { handleSubmit }
