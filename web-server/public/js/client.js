console.log("hello amk")

const weatherForm = document.querySelector('form')
const addressTxt = document.querySelector('input')

const line1 = document.querySelector('#line1')
const line2 = document.querySelector('#line2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    line1.textContent = "loading.."
    line2.textContent = ""

    const location = addressTxt.value
    console.log(`location= ${location}`)

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
                //console.log(data.error)
                line1.textContent = data.error
            else {                
                //console.log(`place: ${data.place}`)
                //console.log(`temp: ${data.temp}`)
                line1.textContent = `place: ${data.place}`
                line2.textContent = `temp: ${data.temp}`
            }
        })
    })
})