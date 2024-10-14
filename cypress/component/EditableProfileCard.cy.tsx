import { EditableProfileCard } from '../../src/features/EditableProfileCard';
import { TestProvider } from '../../src/shared/lib/tests/renderComponent/renderComponent';

const USER_ID = '1'; // as same as in fixture: 'profile.json' file

describe('EditableProfileCard.cy.ts', () => {
  it('Mount', () => {
    cy.intercept('GET', '**/profile/*', { fixture: 'profile.json' });

    cy.mount(
      <TestProvider options={{
        initialState: {
          user: {
            authData: { id: USER_ID },
          },
        },
      }}
      >
        <EditableProfileCard profileId={USER_ID} />
      </TestProvider>,
    );
  });
});
