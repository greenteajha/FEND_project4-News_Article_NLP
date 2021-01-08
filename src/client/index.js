import { checkForName } from './js/nameChecker'
import { handleSubmit } from './js/formHandler'

const lang = "en";
let zipCode = "";

// Test fetch function
const fetchData = async () => {

    zipCode = document.getElementById('url').value;
    const request = await fetch('/test');

    try{
        
        const allData = await request.json();
        console.log(allData);

    }catch(error){
        console.log("error", error);
    }
}

// Create an event listener for clicking the button
document.getElementById('retrieve').addEventListener('click', fetchData());

console.log("zip code: "+zipCode);
console.log("language: "+lang);