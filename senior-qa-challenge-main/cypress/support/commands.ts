/// <reference types="cypress" />

Cypress.Commands.add('visitWithLocationPermission', (url) => {
    cy.window().then((win) => {
      cy.stub(win.navigator.permissions, 'query').resolves({ state: 'granted' });
    });
  
    cy.visit(url);
  });
  
  declare global {
    namespace Cypress {
      interface Chainable {
        visitWithLocationPermission(url: string): Chainable<Element>
      }
    }
  }
  
  export {};