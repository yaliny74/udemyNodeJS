const path = require('path')
const express = require('express')

const forecast = require('../../weather-app/utils/forecast')
const { networkInterfaces } = require('os')
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
app.get('/weather', (req, res) => {
    
    forecast(42, 29, (forecastError, forecastData) => {
        if (forecastError) {
            return res.send(forecastError)
        }        
        res.send(forecastData)
    })  
     
})
app.get('*', (req, res) => res.send(`bir siktir git lan olmayan pathler isteme: ${req.path}`))


app.listen(3000, () => console.log("http server started on port 3000"))
