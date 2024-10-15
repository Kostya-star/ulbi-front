let profileId: string;

describe('Profile edit', () => {
  beforeEach(() => {
    cy.login().then((user) => {
      profileId = user.id;
      cy.visit(`profile/${user.id}`);
    });
  });

  afterEach(() => {
    cy.resetProfile(profileId);
  });

  it('ProfileCard.firstname input should have value', () => {
    cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
  });
  it('ProfileCard.lastname input should have value', () => {
    cy.getByTestId('ProfileCard.lastname').should('have.value', 'test');
  });

  it('edit profile', () => {
    const newFirstNameTest = 'newFirstNameTest';
    const newLastNameTest = 'newLastNameTest';

    cy.updateProfile(newFirstNameTest, newLastNameTest);
    cy.getByTestId('ProfileCard.firstname').should(
      'have.value',
      newFirstNameTest,
    );
    cy.getByTestId('ProfileCard.lastname').should(
      'have.value',
      newLastNameTest,
    );
  });
});
