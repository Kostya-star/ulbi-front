describe('Articles list', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });

  it('ArticlesList should be rendered', () => {
    cy.getByTestId('ArticlesList').should('exist');
  });
});
