// Import retrieveNLPresults from formHandler.js for testing
import { retrieveNLPresults } from "../src/client/js/formHandler"

// Run test to 
describe ('FORM HANDLING TEST', () => {
    test('Check if submission of valid URL to the backend returns an API result', async () => {

        const url = {submittedURL:'https://jestjs.io/en/help'}

        return retrieveNLPresults(url).then(data => {
            expect(data.resultAgreement).toBe('DISAGREEMENT');
        })
    })
})