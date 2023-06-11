// weatherPage.js
export default class WeatherPage {
    visit() {
      cy.visit("http://localhost:3000/weather");
    }
  
    verifyDashboardTitle() {
      cy.get("h1[class$='title has-text-centered']").should('have.text', 'Dashboard');
    }
  
    verifySettingsLink() {
      cy.get("a[href='/weather/settings']").contains('Settings');
    }
  
    clickSettingsLink() {
      cy.get("a[href='/weather/settings']").click();
    }
  
    verifyLocationsTitle() {
      cy.xpath("//h2[normalize-space()='Locations']").contains('Locations');
    }
  
    verifyLocationsDescription() {
      cy.xpath("//p[normalize-space()='Select the locations you want to see']").contains('see');
    }
  
    verifyAddNewLocationButton() {
      cy.xpath("//button[contains(text(),'➕ Add new location')]").contains('Add new');
    }
  
    verifyUnitsTitle() {
      cy.xpath("//h2[normalize-space()='Units']").contains('Units');
    }
  
    verifyUnitsDescription() {
      cy.xpath("//p[normalize-space()='Select the unit system of your preference']").contains('your preference');
    }
  
    verifyMetricButton() {
      cy.xpath("//div[@class='buttons']//button[1]").contains('Metric');
    }
  
    verifyImperialButton() {
      cy.xpath("//div[@class='buttons']//button[2]").contains('Imperial');
    }

    clickSettingsLink() {
      cy.get("a[href='/weather/settings']").click();
    }
  
    addNewLocation(location) {
      cy.window().then((win) => {
        cy.stub(win, 'prompt').returns(location);
      });
      cy.xpath("//button[contains(text(),'➕ Add new location')]").click();
    }
  
    verifyLocationAdded(location) {
      cy.xpath(`//div[normalize-space()='${location}']`).contains(location);
    }
  
    removeLocation(location) {
      cy.xpath(`//button[@aria-label='Remove ${location}']`).click();
    }
  
    verifyLocationNotPresent(location) {
      cy.get('body')
        .invoke('text')
        .then((text) => {
          cy.wrap(text).should('not.include', location);
        });
    }

    verifyTemperatureUnit() {
      cy.get('body')
        .invoke('text')
        .then(text => {
          cy.wrap(text).should('include', "°C");
        });
      }
  
    navigateToDashboard() {
      cy.xpath("//a[normalize-space()='Back to Dashboard']").click();
    }
  
    verifyDashboardTitle() {
      cy.get("h1[class$='title has-text-centered']").should('have.text', 'Dashboard');
    }
    ClickCheckboxUnit() {
      cy.xpath("//section[2]//div[1]//button[1]").click();
    }
  }