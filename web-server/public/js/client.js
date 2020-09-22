console.log("hello amk")

const weatherForm = document.querySelector('form')
const addressTxt = document.querySelector('input')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = addressTxt.value
    console.log(`location= ${location}`)

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
                console.log(data.error)
            else {
                //console.log(data)
                console.log(`place: ${data.place}`)
                console.log(`temp: ${data.temp}`)
            }
        })
    })
})