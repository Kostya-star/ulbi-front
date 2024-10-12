import { selectByDataTestId } from '../helpers/selectByDataTestId';

const LOGIN = 'admin';
const PASSWORD = '123';

describe('Routing', () => {
  describe('User is not authenticated', () => {
    it('Main page should be rendered', () => {
      cy.visit('/');
      cy.get(`[${selectByDataTestId('MainPage')}]`).should('exist');
    });
    it('Forbidden page should be rendered', () => {
      cy.visit('/profile/1');
      cy.get(`[${selectByDataTestId('ForbiddenPage')}]`).should('exist');
    });
    it('NotFoundPage page should be rendered', () => {
      cy.visit('/asdfghjykjhgfwefghtyhgfdwerkjhgfsdvsv');
      cy.get(`[${selectByDataTestId('NotFoundPage')}]`).should('exist');
    });
  });
  describe('User authenticated', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Profile page should be rendered', () => {
      cy.visit('/profile/1');
      cy.get(`[${selectByDataTestId('ProfilePage')}]`).should('exist');
    });
    it('Articles page should be rendered', () => {
      cy.visit('/articles');
      cy.get(`[${selectByDataTestId('ArticlesPage')}]`).should('exist');
    });
  });
});
