import { User } from '../../../src/entities/User';
import { USER_DATA_LOCAL_STORAGE } from '../../../src/shared/const/localStorage';

export const login = (username: string = 'test', password: string = 'test') => {
  return cy
    .request({
      method: 'POST',
      url: 'http://localhost:8000/login',
      body: {
        username,
        password,
      },
    })
    .then(({ body }) => {
      window.localStorage.setItem(USER_DATA_LOCAL_STORAGE, JSON.stringify(body));
      return body;
    });
};

declare global {
  namespace Cypress {
    interface Chainable {
      login(username?: string, password?: string): Chainable<User>;
    }
  }
}
