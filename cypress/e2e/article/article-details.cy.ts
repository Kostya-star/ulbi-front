let currentArticleId: string;

describe('Articles details', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      cy.visit(`articles/${article.id}`);
    });
  });

  afterEach(() => {
    cy.deleteArticle(currentArticleId);
  });

  it('ArticleDetails should be rendered', () => {
    cy.getByTestId('ArticleDetails').should('exist');
  });
});
