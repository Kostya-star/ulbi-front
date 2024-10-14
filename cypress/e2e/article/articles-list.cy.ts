describe('Articles list', () => {
  beforeEach(() => {
    cy.login().then(() => {
      cy.visit('articles');
    });
  });

  it('ArticlesList should be rendered', () => {
    cy.getByTestId('ArticlesList').should('exist');
  });

  // example of a skipped test
  it.skip('ArticlesList should be rendered(skipped)', () => {
    cy.getByTestId('dsjfdsjklfmds').should('exist');
  });

  it('Articles are loaded', () => {
    // mock with fixtures
    cy.intercept('GET', '**/articles?*', { fixture: 'articles.json' });
    cy.getByTestId('ArticlesListItem').should('have.length.greaterThan', 3);
  });
});
