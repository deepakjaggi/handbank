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
        it('verify  that application can use the current location', () => {
            cy.visit("http://localhost:3000/weather")                        
        })
});

