// Import URL validation function from validation.js for testing
import { validateURL } from "../src/client/js/validation"

// Run test for validating valid URL
describe ('VALIDATION TEST', () => {
    test ('Checking user input to see if it is a valid URL', () => {
        const url='http://api.meaningcloud.com/'
        expect (validateURL(url)).toBe(true)
    })
})