import path from 'path';

import { Configuration, DefinePlugin } from 'webpack';

import { buildCssLoaders } from '../build/loaders/buildCssLoaders';

export default {
  stories: [
    '../../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
      },
    },
    '@storybook/addon-interactions',
    '@storybook/addon-actions',
    'storybook-addon-mock',
    'storybook-addon-themes',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config: Configuration): Promise<Configuration> => {
    const srcPath = path.resolve(__dirname, '..', '..', 'src');

    config.resolve?.modules?.push(srcPath);
    config.resolve?.extensions?.push('.ts', '.tsx');
    config.module?.rules?.push(buildCssLoaders(true));

    config.plugins?.push(new DefinePlugin({
      __IS_DEV__: true,
      __API_URL__: JSON.stringify('https://testapi.ru'),
      __PROJECT__: JSON.stringify('storybook'),
    }));

    handleSvg(config);

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': srcPath,
      };
    }

    return config;
  },
};

function handleSvg(config: Configuration) {
  const imageRule = config.module?.rules?.find((rule) => {
    return (rule as { test: RegExp }).test?.test('.svg');
  }) as { [key: string]: any };

  imageRule.exclude = /\.svg$/;

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
}
