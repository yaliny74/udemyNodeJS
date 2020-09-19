const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const yargs = require('yargs')

yargs.command({
    command: 'get',
    describe: 'get weather forecast for an address',
    builder: {
        adres: {
            describe: 'address amk',
            demandOption: true,
            type: 'string'
        },                    
    },    
    handler: (argv) => geocodeHelper(argv.adres)
});

const geocodeHelper = (address) => {
    geocode(address, (error, data) => {
        if (error) {
            return console.error(error)
        }
        console.log(data.place)
        console.debug("lat =" +  data.lat + " data.lon:"  + data.lon)
        
        forecast(data.lat, data.lon, (forecastError, forecastData) => {
            if (forecastError) {
                return console.error(forecastError)
            }
    
            console.log(forecastData.location.lat + "," + forecastData.location.lon + " temp is " + forecastData.data.temperature)
        })                
    })        
}

yargs.parse();