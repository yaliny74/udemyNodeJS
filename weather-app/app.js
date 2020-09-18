const request = require('request')

const url = 'http://api.weatherstack.com/current?access_key=d3b1902d487c3af4eaccda4db37e8a3f&query=dublin';


function weatherCollector() {
    const response = request(url, (error, response, body) => {
        const data = JSON.parse(body);
        //console.log(data);
    
        console.log(`It is currently ${data.current.temperature} degrees out, but it feels like ${data.current.feelslike} degrees.`)
    });
}

for (i =0; i<3; i++) {

    setTimeout(() => weatherCollector(), i * 1000);

}
