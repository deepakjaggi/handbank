import Root from '../../Models/Model';
//import '../../integration/mock-server.spec'

let testDataNorway;
let testDataBerlin;
let testDataPort;


function mapResponseToClass(responseData, classType) 
{
    const instance = new classType();
    Object.assign(instance, responseData);
    return instance;
}
  
describe('apiTests', function () {

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
                var getResponse = mapResponseToClass(response,Root);
                cy.log(JSON.stringify(getResponse.body));
                expect(getResponse.status).to.equal(200);
                expect(getResponse.body.name).to.equal("Råholt");
                // expect(response.status).to.equal(200);
                // expect(response.body.name).to.equal("Råholt");
                //expect(response.body.weather[0].main).to.equal("Clear");
            })
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
                //expect(response.body.name).to.equal("Alt-Kölln");
            })
    });
    it('API-Tests-3', function () {
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + this.testDataPort.lat + "&lon=" + this.testDataPort.lon + "&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6"
        cy.request('GET', url).
            then((response) => {
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal("Porto");
                //expect(response.body.weather[0].main).to.equal("Clouds");   //These values can also be taken from Fixtures Json
            })
    });
});  