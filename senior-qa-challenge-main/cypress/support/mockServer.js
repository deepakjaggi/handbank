Cypress.Commands.add('setupMockServer', () => {
  cy.intercept('GET', 'https://api.openweathermap.org/data/2.5/weather?lat=60.2838578&lon=11.1728733&units=Metric&appid=eb8a70f875f4e4baabc1399cec36e4b6', {
    statusCode: 200,
    body: {
      coord: { lon: 11.1729, lat: 60.2839 },
      weather: [{ id: 800, main: 'Clear', description: 'clear sky', icon: '01d' }],
      base: 'stations',
      main: {
        temp: 22.17,
        feels_like: 21.49,
        temp_min: 21.08,
        temp_max: 22.74,
        pressure: 1024,
        humidity: 40,
      },
      visibility: 10000,
      wind: { speed: 5.14, deg: 190 },
      clouds: { all: 0 },
      dt: 1686490582,
      sys: { type: 2, id: 2006195, country: 'NO', sunrise: 1686448247, sunset: 1686515950 },
      timezone: 7200,
      id: 3142539,
      name: 'Råholt',
      cod: 200,
    },
  }).as('weatherData');
});




// In this example, Cypress.Commands.add() is used to define a custom Cypress command called setupMockServer(). 
//Inside the command, the cy.route() command is used to mock the OpenWeatherMap API response for the specified URL.