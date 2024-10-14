/* eslint-disable max-len */
import { Article } from '../../../src/entities/Article';

const defaultArticle = {
  title: 'Javascript news',
  subtitle: "What's new in JS for 2022?",
  img: 'https://teknotower.com/wp-content/uploads/2020/11/js.png',
  views: 1022,
  createdAt: '02/26/2022',
  userId: '1',
  type: ['IT'],
  blocks: [],
};

export const createArticle = (article?: Article) => {
  return cy
    .request({
      method: 'POST',
      url: `http://localhost:8000/articles`,
      headers: { Authorization: 'asdfg' },
      body: article ?? defaultArticle,
    })
    .then((resp) => {
      return resp.body;
    });
};

export const deleteArticle = (articleId: string) => {
  cy.request({
    method: 'DELETE',
    url: `http://localhost:8000/articles/${articleId}`,
    headers: { Authorization: 'asdfg' },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      createArticle(article?: Article): Chainable<Article>;
      deleteArticle(articleId: string): Chainable<void>;
    }
  }
}
