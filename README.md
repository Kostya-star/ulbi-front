## Start project

```
npm install - install dependencies
npm run start:front:back:vite - launch the server + frontend in dev mode WITH VITE
npm run start:front:back - launch the server + frontend in dev mode WITH WEBPACK

```

## Scripts

- `npm run start:front` - Starts the frontend using Webpack on port 3000.
- `npm run start:back` - Starts the backend server using json-server.
- `npm run start:front:back` - Runs both frontend (Webpack) and backend concurrently.
- `npm run start:front:vite` - Starts the frontend using Vite.
- `npm run start:front:back:vite` - Runs both frontend (Vite) and backend concurrently.
- `npm run build:prod` - Builds the application for production using Webpack with the API URL set to https://ulbi-backend-server.vercel.app.
- `npm run build:dev` - Builds the application for development.
- `npm run lint:ts` - Lints TypeScript files using ESLint.
- `npm run lint:ts:fix` - Fixes linting errors in TypeScript files.
- `npm run lint:scss` - Lints SCSS files using Stylelint.
- `npm run lint:scss:fix` - Fixes linting errors in SCSS files.
- `npm run test:unit` - Runs unit tests using Jest.
- `npm run test:ui` - Runs UI tests using Loki.
- `npm run test:ui:ok` - Approves UI visual changes in Loki.
- `npm run test:ui:ci` - Runs UI tests and Storybook concurrently in CI mode.
- `npm run test:ui:report` - Generates JSON and HTML reports for UI tests.
- `npm run storybook` - Starts Storybook for component development.
- `npm run storybook:build` - Builds Storybook.
- `npm run make:slice` - Creates a new feature slice using the custom FSD script

## Project Architecture
The project is built according to the Feature-Sliced Design methodology.

Link to documentation - [feature sliced design](https://feature-sliced.design/docs/get-started/tutorial)

## Working with Translations
The project uses the i18next library for translations. Translation files are stored in public/locales.

For convenience, it's recommended to install a plugin for WebStorm/VSCode.

i18next documentation - [https://react.i18next.com/](https://react.i18next.com/)

## Testing
The project uses 4 types of tests:

1) Regular unit tests with Jest - npm run test:unit
2) Component tests with React Testing Library - npm run test:unit
3) Screenshot testing with Loki - npm run test:ui
4) E2E testing with Cypress - npm run test:e2e
More about tests - [Testing Documentation](/docs/tests.md)

## Linting
The project uses ESLint to check TypeScript code and Stylelint to check style files.

Additionally, for strict control of the main architectural principles, a custom ESLint plugin *eslint-plugin-front-fresh* is used, which contains 3 rules:

1) path-checker - prohibits using absolute imports within the same module
2) layer-imports - checks the correct use of layers according to FSD principles (e.g., widgets cannot be used in features and entities)
3) public-api-imports - allows imports from other modules only through the public API. Has auto-fix.

##### Running Linters
- `npm run lint:ts` - Check ts files with linter
- `npm run lint:ts:fix` - Fix ts files with linter
- `npm run lint:scss` - Check scss files with style linter
- `npm run lint:scss:fix` - Fix scss files with style linter

## Storybook
Storybook cases are described for each component. Server requests are mocked using storybook-addon-mock.

Storybook files are created next to the component with a .stories.tsx extension.

To launch Storybook:

- `npm run storybook`

More about [Storybook](/docs/storybook.md)

Example:

```typescript jsx
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Button, ButtonSize, ButtonTheme } from './Button';

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  theme: ButtonTheme.CLEAR,
};

export const ClearInverted = Template.bind({});
ClearInverted.args = {
  children: 'Text',
  theme: ButtonTheme.CLEAR_INVERTED,
};

export const OutlinedLight = Template.bind({});
OutlinedLight.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
};

export const OutlinedLightM = Template.bind({});
OutlinedLightM.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
  size: ButtonSize.M,
};

export const OutlinedLightL = Template.bind({});
OutlinedLightL.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
  size: ButtonSize.L,
};

export const OutlinedLightXL = Template.bind({});
OutlinedLightXL.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
  size: ButtonSize.XL,
};

export const OutlinedDark = Template.bind({});
OutlinedDark.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
};

OutlinedDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const Background = Template.bind({});
Background.args = {
  children: '>',
  theme: ButtonTheme.BACKGROUND,
};

export const BackgroundInverted = Template.bind({});
BackgroundInverted.args = {
  children: '>',
  theme: ButtonTheme.BACKGROUND_INVERTED,
};

export const Square = Template.bind({});
Square.args = {
  children: '>',
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
};

export const SquareSizeM = Template.bind({});
SquareSizeM.args = {
  children: '>',
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.M,
};

export const SquareSizeL = Template.bind({});
SquareSizeL.args = {
  children: '>',
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.L,
};

export const SquareSizeXL = Template.bind({});
SquareSizeXL.args = {
  children: '>',
  theme: ButtonTheme.BACKGROUND_INVERTED,
  square: true,
  size: ButtonSize.XL,
};

export const PrimaryDisabled = Template.bind({});
PrimaryDisabled.args = {
  children: 'Text',
  disabled: true,
};
```

## Project Configuration
For development, the project contains 2 configurations:

1. Webpack - ./config/build
2. Vite - vite.config.ts

Both bundlers are adapted to the main features of the application.

All configuration files are stored in /config:

- /config/babel - Babel
- /config/build - Webpack configuration
- /config/jest - Test environment configuration
- /config/storybook - Storybook configuration

In the `scripts` folder, there are various scripts for refactoring, simplifying code writing, report generation, etc.

## CI Pipeline and Pre-commit Hooks
The GitHub Actions configuration is located in /.github/workflows. CI runs all types of tests, builds the project and Storybook, and performs linting.

In pre-commit hooks, linters check the project. The configuration is in /.husky

## Working with Data
Data interaction is handled using Redux Toolkit. Whenever possible, reusable entities should be normalized using EntityAdapter.

Requests to the server are made using [RTK query](/src/shared/api/rtkApi.ts).

For asynchronous reducer loading (to avoid pulling them into the main bundle), useReduxReducerManager HOC wrapper is used.

### Working with Feature Flags
The use of feature flags is only allowed through the toggleFeatures helper.

It takes an object with the following options:

{
   name: the name of the feature flag, 
   on: the function that will execute when the feature is **enabled**, 
   off: the function that will execute when the feature is **disabled** 
}

To automatically remove a feature, use the remove-feature.ts script, which takes 2 arguments:

1. The name of the feature flag to be removed
2. The state (on/off)

## Entities

- [Article](/src/entities/Article)
- [Comment](/src/entities/Comment)
- [Counter](/src/entities/Counter)
- [Country](/src/entities/CountrySelect)
- [Currency](/src/entities/CurrencySelect)
- [Notification](/src/entities/Notification)
- [Profile](/src/entities/Profile)
- [Rating](/src/entities/Rating)
- [User](/src/entities/User)

## Features

- [addCommentForm](/src/features/addCommentForm)
- [articleRating](/src/features/ArticleRating)
- [articleRecommendationsList](/src/features/articleRecommendationsList)
- [AuthByUsername](/src/features/AuthByUsername)
- [avatarDropdown](/src/features/AvatarDropdown)
- [editableProfileCard](/src/features/EditableProfileCard)
- [LangSwitcher](/src/features/LangSwitcher)
- [notificationButton](/src/features/NotificationButton)
- [ThemeSwitcher](/src/features/ThemeSwitcher)
- [scrollSave](/src/features/scrollSave)
