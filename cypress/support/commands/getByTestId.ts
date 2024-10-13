import { selectByDataTestId } from '../../helpers/selectByDataTestId';

export const getByTestId = (testId: string) => {
  return cy.get(selectByDataTestId(testId));
};

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId(testId: string): Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
