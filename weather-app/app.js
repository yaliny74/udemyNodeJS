const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=d3b1902d487c3af4eaccda4db37e8a3f&query=dublin';


function weatherCollector() {
    const response = request(url, (error, response, body) => {
        const data = JSON.parse(body);
        //console.log(data);
    
        console.log(`It is currently ${data.current.temperature} degrees out, but it feels like ${data.current.feelslike} degrees.`)
    });
}

function locationCollector(address) {
    const addressURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoieWFsaW55IiwiYSI6ImNrZjd6MDlrMTA3OGoycHM2M2l1Mmpnd3YifQ.tJu9kOVY9fcrQ8lPeRTMfQ&country=IE";
    console.log(addressURL)
    const response = request(addressURL, (error, response, body) => {

        if (error) {
            console.error(error)                
        }
        else {
            const data = JSON.parse(body);
            if (data.features.length == 0) 
                console.error("cannot find the address! " + address);
            else {
                const centerData = data.features[0].center;
                console.log(`place:${data.features[0].place_name} lat: ${centerData[0]} lon:${centerData[1]}`)
                //console.log(data)
            }           
        }
    });
}
//locationCollector("Grand Canal Street");
locationCollector("fuck_thisshit");

/*
for (i =0; i<1; i++) {
    setTimeout(() => weatherCollector(), i * 1000);
}

*/


//https://api.mapbox.com/geocoding/v5/mapbox.places/Grand%20Canal%20Street.json?access_token=pk.eyJ1IjoieWFsaW55IiwiYSI6ImNrZjd6MDlrMTA3OGoycHM2M2l1Mmpnd3YifQ.tJu9kOVY9fcrQ8lPeRTMfQ&country=IE
