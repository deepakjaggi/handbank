/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

import WeatherPage from '../../pageobjects/wheatherpage';
import '../../support/commands';




describe('uiTests', function () {


  it('TC1 -- verify static element', () => {
    var wp = new WeatherPage();
    wp.visit();
    wp.verifyDashboardTitle();
    wp.verifySettingsLink();
    wp.clickSettingsLink();
    wp.verifyLocationsTitle();
    wp.verifyLocationsDescription();
    wp.verifyAddNewLocationButton();
    wp.verifyUnitsTitle();
    wp.verifyUnitsDescription();
    wp.verifyMetricButton();
    wp.verifyImperialButton();
  })

  //I could not solve this test case --- not sure  how to achieve this, in selenium wehave browser capabilities where we can set location access = true, not sure here, how to do so  
  it('TC2 -- should be able to use the current location', () => {
    cy.visitWithLocationPermission("http://localhost:3000/weather")
    // I have found one method on the internet, but it still does not work  : visitWithLocationPermission, i have added in custom command
    Cypress.Commands.add('visitWithLocationPermission', (url) => {
      cy.window().then((win) => {
        cy.stub(win.navigator.permissions, 'query').resolves({ state: 'granted' });
      });

      cy.visit(url);
    });
    if (cy.xpath("//div[normalize-space()='Råholt']").contains("Råholt")) {
      cy.log("Element exists - so application is capable to add a new location")
    }
    cy.get('body')
      .invoke('text')
      .then(text => {
        cy.log(text)
      });
  });

  it('TC3 -- Verify that the user can add/remove new geographical locations', () => {
    cy.visit("http://localhost:3000/weather")
    var wp = new WeatherPage();
    wp.clickSettingsLink();
    wp.addNewLocation('Oslo');
    wp.navigateToDashboard();
    wp.verifyLocationAdded('Oslo');

    wp.clickSettingsLink();
    wp.removeLocation('Oslo');
    wp.navigateToDashboard();
    wp.verifyLocationNotPresent('Oslo');
  })


  it('TC4 -- should be able to change the unit', () => {
    cy.visit("http://localhost:3000/weather")
    var wp = new WeatherPage();
    wp.clickSettingsLink();
    wp.ClickCheckboxUnit();
    wp.navigateToDashboard();
    cy.wait(5000);
    wp.verifyTemperatureUnit();
  })

});
