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

Cypress.on('window:before:load', (win) => {
  win.console.log = (...args) => {
    Cypress.log({ name: 'console:log', message: args.join(' ') });
  };

  win.console.error = (...args) => {
    Cypress.log({ name: 'console:error', message: args.join(' ') });
  };
});
