// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

declare namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Log in via UI
       * @example
       * cy.login(username: string, password: string)
       */
      login(): Chainable<any>
      /**
       * Log in via API
       * @example
       * cy.apiLogin()
       */
      apiLogin(): Chainable<any>
  
      /**
       * Wait for viewer to load
       * @example
       *  cy.waitForFirstLoad()
       */
      waitForFirstLoad(): Chainable<any>
  
      /**
       * Log out
       * @example
       *  cy.logout()
       */
      logout(): Chainable<any>
    }
  }
  require('cypress-xpath')