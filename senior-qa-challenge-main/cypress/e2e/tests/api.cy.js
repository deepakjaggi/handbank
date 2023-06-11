let testDataNorway;
let testDataBerlin;
let testDataPort;

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
                expect(response.status).to.equal(200);
                expect(response.body.name).to.equal("Råholt");
                expect(response.body.weather[0].main).to.equal("Clear");    //These values can also be taken from Fixtures Json
            })
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