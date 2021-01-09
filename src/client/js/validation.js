//Function to check if the text matches the pattern of a typical URL
function validateURL(urlToValidate) {
    const url = /(((https?:\/\/)|(www\.))[^\s]+)/g //Regex to match http, https or www.
    return url.test(urlToValidate) //Test if the text matches to the regex
}

//Export the function for importing
export { validateURL }
