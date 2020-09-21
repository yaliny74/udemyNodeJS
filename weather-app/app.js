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
    geocode(address, (error, {place, lat, lon}) => {
        if (error) {
            return console.error(error)
        }
        console.log(place)
        console.debug("lat =" +  lat + " lon:"  + lon)
        
        forecast(lat, lon, (forecastError, forecastData) => {
            if (forecastError) {
                return console.error(forecastError)
            }
    
            console.log(forecastData.location.lat + "," + forecastData.location.lon + " temp is " + forecastData.data.temperature)
        })                
    })        
}

yargs.parse();