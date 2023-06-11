/// <reference types="Cypress" />
/// <reference types="cypress-xpath" />

describe('uiTests', function () {
  it('verify static element', () => {
    cy.visit("http://localhost:3000/weather")
    cy.get("h1[class$='title has-text-centered']").should('have.text', 'Dashboard')
    cy.get("a[href='/weather/settings']").contains('Settings')
    cy.get("a[href='/weather/settings']").click()
    cy.xpath("//h2[normalize-space()='Locations']").contains('Locations')
    cy.xpath("//p[normalize-space()='Select the locations you want to see']").contains('see')
    cy.xpath("//button[contains(text(),'➕ Add new location')]").contains('Add new')
    cy.xpath("//h2[normalize-space()='Units']").contains('Units')
    cy.xpath("//p[normalize-space()='Select the unit system of your preference']").contains('your preference');
    cy.xpath("//div[@class='buttons']//button[1]").contains('Metric');
    cy.xpath("//div[@class='buttons']//button[2]").contains('Imperial');
  })
  // it('verify  that application can use the current location', () => {
  //   cy.window().then((win) => {
  //     // Set the location manually
  //     win.navigator.geolocation.getCurrentPosition = (success) => {
  //       const position = { coords: { latitude: 60.2838578, longitude: 11.1728733 } };
  //       success(position);
  //     };
  //   });
  //   cy.visit("http://localhost:3000/weather")
  //   cy.xpath("//div[normalize-space()='Råholt']").contains('Råholt')
  // })
  it('verify  that application can use the current location', () => {
    cy.fail("I could not verify that test")
  })
  it('Verify that the user can add/remove new geographical locations', () => {
    cy.visit("http://localhost:3000/weather")
    cy.get("a[href='/weather/settings']").click()
    cy.window().then((win) => {
      cy.stub(win, 'prompt').returns('Oslo')
    })
    cy.xpath("//button[contains(text(),'➕ Add new location')]").click()
    cy.xpath("//a[normalize-space()='Back to Dashboard']").click()
    if (cy.xpath("//div[normalize-space()='Oslo']").contains("Oslo")) {
      cy.log("Element exists - so application is capable to add a new location")
    }
    cy.get("a[href='/weather/settings']").click()
    cy.xpath("//button[@aria-label='Remove Oslo']").click()
    cy.xpath("//a[normalize-space()='Back to Dashboard']").click()
    cy.wait(5000);
    cy.get('body')
      .invoke('text')
      .then(text => {
        cy.wrap(text).should('not.include', "Oslo");
      });
  })
  it.only('should be able to change the unit', () => {
    cy.visit("http://localhost:3000/weather")
    cy.get("a[href='/weather/settings']").contains('Settings').click()    
    cy.xpath("//section[2]//div[1]//button[1]").click()
    cy.xpath("//a[normalize-space()='Back to Dashboard']").click()
    cy.wait(5000);    
    cy.get('body')
      .invoke('text')
      .then(text => {
        cy.wrap(text).should('include', "°C");
      });
  })
});