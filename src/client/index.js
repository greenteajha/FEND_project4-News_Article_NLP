// Import handleSubmit function from formHandler.js
import { handleSubmit } from './js/formHandler'
// Import scss styles
import './styles/styles.scss'

// Create an event listener for clicking the button
document.getElementById('retrieve').addEventListener('click', handleSubmit);