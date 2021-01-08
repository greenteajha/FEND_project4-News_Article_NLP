const retrieveNLPresults = async (APIRequest) => {
    const res = await fetch(
        '/test', {
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
        console.log("ERROR MESSAGE: "+Error)
    }
}

function handleSubmit(event) {
    event.preventDefault()

    const submittedURL = document.getElementById('url').value;

    //checkForName(formText)

    console.log(submittedURL)
    retrieveNLPresults({submittedURL})
}

export { handleSubmit }
