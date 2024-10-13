describe('Routing', () => {
  describe('User is not authenticated', () => {
    it('Main page should be rendered', () => {
      cy.visit('/');
      cy.getByTestId('MainPage').should('exist');
    });
    it('Forbidden page should be rendered', () => {
      cy.visit('/profile/1');
      cy.getByTestId('ForbiddenPage').should('exist');
    });
    it('NotFoundPage page should be rendered', () => {
      cy.visit('/asdfghjykjhgfwefghtyhgfdwerkjhgfsdvsv');
      cy.getByTestId('NotFoundPage').should('exist');
    });
  });
  describe('User authenticated', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Profile page should be rendered', () => {
      cy.visit('/profile/1');
      cy.getByTestId('ProfilePage').should('exist');
    });
    it('Articles page should be rendered', () => {
      cy.visit('/articles');
      cy.getByTestId('ArticlesPage').should('exist');
    });
  });
});
