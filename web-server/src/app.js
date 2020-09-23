const path = require('path')
const express = require('express')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const pubDir = path.join(__dirname, "../public")

const app = express()

app.set('view engine', 'hbs')
app.use(express.static(pubDir))

app.get('/help', (req, res) => {
    res.render('help.hbs', {
        'msg': 'way amk!',
        'time': Date.now()
    })
})
app.get('/about', (req, res) => res.send("<html><body><h1>this is about</body></html>"))
app.get('/weatherFix', (req, res) => {
    
    forecast(42, 29, (forecastError, forecastData) => {
        if (forecastError) {
            return res.send(forecastError)
        }        
        res.send(forecastData)
    })       
})

app.get('/weather', (req, res) => {

    if (req.query.address === undefined) {
        return res.send('error: provide an address bitch!')
    }
    else {
        geocode(req.query.address, (error, response) => {
            if (error) {
                return res.send({error
                    //'error': error
                })
            }
            const {place, lat, lon} = response
            console.log(place)
            
            forecast(lat, lon, (forecastError, forecastData) => {
                if (forecastError) {
                    return res.send({
                        'error' : forecastError
                    })
                }
                else {
                    res.send({
                        'place': place,
                        'lat': forecastData.location.lat,
                        'lon':  forecastData.location.lon,
                        'temp': forecastData.data.temperature,
                        'desc': forecastData.data.weather_descriptions
                    })
                }
            })                
        })                   
    }        
})


app.get('*', (req, res) => res.send(`siktir git olmayan pathler isteme: ${req.path}`))

//app.listen(3000, () => console.log("http server started on port 3000"))
const port = process.env.PORT || 3000
app.listen(port, () => console.log("http server started on port " + port))
