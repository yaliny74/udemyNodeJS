console.log("hello amk")

fetch('http://localhost:3000/weather?address=dublin').then((response) => {
    response.json().then((data) => {
        if (data.error)
            console.log(data.error)
        else {
            console.log(data)
            console.log(`place: ${data.place}`)
            console.log(`temp: ${data.temp}`)
        }
    })
})