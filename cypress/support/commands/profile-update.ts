export const updateProfile = (newFirstName: string, newLastName: string) => {
  cy.getByTestId('ProfileCardHeader.EditButton').click();
  cy.getByTestId('ProfileCard.firstname').clear().type(newFirstName);
  cy.getByTestId('ProfileCard.lastname').clear().type(newLastName);
  cy.getByTestId('ProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
  cy.request({
    method: 'PUT',
    url: `http://localhost:8000/profile/${profileId}`,
    headers: { Authorization: 'asdfg' },
    body: {
      id: '4',
      first: 'test',
      lastname: 'test',
      age: 873,
      currency: 'USD',
      country: 'USA',
      city: 'Washington',
      username: 'test',
      avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt5hlguGVkKpBcz3R7vXCH8M2WtsCtQOWWxQ&s',
    },
  });
};

declare global {
  namespace Cypress {
    interface Chainable {
      updateProfile(newFirstName: string, newLastName: string): Chainable<void>;
      resetProfile(profileId: string): Chainable<void>;
    }
  }
}
