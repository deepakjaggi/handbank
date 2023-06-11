import Root from '../../Models/Model';
//import '../../integration/mock-server.spec'

let testDataNorway;
let testDataBerlin;
let testDataPort;

const mkedResponse = {
    "coord": {
        "lon": 11.1729,
        "lat": 60.2839
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 22.17,
        "feels_like": 21.49,
        "temp_min": 21.08,
        "temp_max": 22.74,
        "pressure": 1024,
        "humidity": 40
    },
    "visibility": 10000,
    "wind": {
        "speed": 5.14,
        "deg": 190
    },
    "clouds": {
        "all": 0
    },
    "dt": 1686490582,
    "sys": {
        "type": 2,
        "id": 2006195,
        "country": "NO",
        "sunrise": 1686448247,
        "sunset": 1686515950
    },
    "timezone": 7200,
    "id": 3142539,
    "name": "Råholt",
    "cod": 400
};

// describe('Mock Server', () => {
//     beforeEach(() => {
//         cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=60.2838578&lon=11.1728733&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6', (req) => {
//             req.reply({ message: JSON.stringify(mkedResponse) }); // Provide the mocked response
//         }).as('getMockResponse');
//     });

//     it('should receive mocked response from the original API', () => {
//         var url = "https://api.openweathermap.org/data/2.5/weather?lat=60.2838578&lon=11.1728733&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6"
//         cy.request('GET', url).then((x) => {
//             // Assert on the mocked response
//             cy.wait('@getMockResponse').then((interception) => {
//                 expect(interception.response.body.message).to.eq(JSON.stringify(mkedResponse));
//             });
//         })
//     });

// });

describe('apiTests', function () {

    /* 
    1. Please note, i have done such kind of frameworok in cucumber and java, where you an directly parse/Maps using hashmaps. 
    2. We could have also made the methods for automatic GET, POST etc .. 
    3. Responses could have been mapped to Object/class -- I have added one test API-Tests-UsingJsonMapper    
    */

    //part of before hook
    beforeEach(function () {
        //access fixture data
        cy.fixture('testDataNorway.json').then(function (x) {
            this.testDataNorway = x
        })
        cy.fixture('testDataBerlin.json').then(function (y) {
            this.testDataBerlin = y
        })
        cy.fixture('testDataPort.json').then(function (z) {
            this.testDataPort = z
        })
    })
    //test case    
    it('API-Tests-1', function () {
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.testDataNorway.lat + "&lon=" + this.testDataNorway.lon + "&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6"
        cy.request('GET', url).
            then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal("Råholt");
                expect(response.body.weather[0].main).to.equal("Clear");
            })

        //const rootInstance = plainToClass(Root, response); --I was not able to install this NPM otherwise it could be directly mapped to a class.
    });
    //test case    
    it('API-Tests-UsingJsonMapper', function () {
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.testDataNorway.lat + "&lon=" + this.testDataNorway.lon + "&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6"
        cy.request('GET', url).
            then((response) => {
                const formattedBody = JSON.stringify(response.body)
                var rootdataObject = JSON.parse(formattedBody, null, 2)
                cy.log(rootdataObject.name)
                cy.log(rootdataObject.weather[0].id)
                cy.log(rootdataObject.weather[0].main)
                cy.log(rootdataObject.weather[0].description)

            })
        //const rootInstance = plainToClass(Root, response); --I was not able to install this NPM otherwise it could be directly mapped to a class.
    });
    it('API-Tests-2', function () {
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.testDataBerlin.lat + "&lon=" + this.testDataBerlin.lon + "&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6"
        cy.request('GET', url).
            then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal("Alt-Kölln");
            })
    });
    it('API-Tests-3', function () {
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.testDataPort.lat + "&lon=" + this.testDataPort.lon + "&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6"
        cy.request('GET', url).
            then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal("Porto");
                expect(response.body.weather[0].main).to.equal("Clouds");   //These values can also be taken from Fixtures Json
            })
    });
});  