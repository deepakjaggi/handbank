Cypress.on('window:before:load', (win) => {
    cy.stub(win.navigator.geolocation, 'getCurrentPosition', (callback) => {
      return callback({ coords: { latitude: 60.2838578, longitude: 11.1728733 } });
    });
  });