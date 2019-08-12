// Client side JavaScript which runs in browser
console.log('Client side Javascript file')



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const firstMsg = document.querySelector('#msg1')
const secondMsg = document.querySelector('#msg2')

// firstMsg.textContent = 'from Javascript'

// e is the event object in callback
weatherForm.addEventListener('submit', (e) => {
    // prevent default behaviour to render page again
    e.preventDefault()
    firstMsg.textContent = 'Loading ...'
    const location = search.value
    // fetch API only works here
    fetch('http://localhost:3000/weather?address='+location).then((response) => {
    // data is the JavaScript object from response
    // response fetched from web-server
        response.json().then((data) => {
            // runs when JSON data has arrived and parsed
            if(data.error){
                firstMsg.textContent = data.error
                secondMsg.textContent = ''
            }
            else{
                firstMsg.textContent = data.location
                secondMsg.textContent = data.forecast
            }
        })
        })
    

})