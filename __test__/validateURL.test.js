import { validateURL } from "../src/client/js/validation"

describe ('check Name', () => {
    test ('Testing URL', () => {
        const url='http://api.meaningcloud.com/'
        expect (validateURL(url)).toBe(true)
    })
})