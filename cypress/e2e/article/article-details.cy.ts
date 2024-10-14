let currentArticleId: string;

describe('Articles details', () => {
  beforeEach(() => {
    cy.login();
    cy.createArticle().then((article) => {
      currentArticleId = article.id;
      // console.log("Article id:", JSON.stringify(article.id));

      cy.visit(`articles/${article.id}`);
    });
  });

  afterEach(() => {
    cy.deleteArticle(currentArticleId);
  });

  it('ArticleDetails should be rendered', () => {
    cy.getByTestId('ArticleDetails').should('exist');
  });

  it('User creates a comment', () => {
    // mock with fixtures
    cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
    cy.getByTestId('ArticleDetails');
    cy.getByTestId('AddCommentForm').scrollIntoView();
    cy.addComment('newComment');
    cy.getByTestId('CommentCard.Content').should('have.length', 1);
  });
});
