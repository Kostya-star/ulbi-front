import { createArticle, deleteArticle } from './commands/article';
import { addComment } from './commands/comments';
import { getByTestId } from './commands/getByTestId';
import { login } from './commands/login';
import { resetProfile, updateProfile } from './commands/profile-update';

Cypress.Commands.add('login', login);
Cypress.Commands.add('getByTestId', getByTestId);
Cypress.Commands.add('updateProfile', updateProfile);
Cypress.Commands.add('resetProfile', resetProfile);
Cypress.Commands.add('createArticle', createArticle);
Cypress.Commands.add('deleteArticle', deleteArticle);
Cypress.Commands.add('addComment', addComment);

export {};
