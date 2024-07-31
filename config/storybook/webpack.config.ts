import path from 'path';
import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
import { buildCssLoaders } from '../build/loaders/buildCssLoaders';
import { BuildPaths } from '../build/types/config';

export default ({ config }: { config: Configuration }) => {
  // const paths: BuildPaths = {
  //   build: '',
  //   entry: '',
  //   html: '',
  //   src: path.resolve(__dirname, '..', '..', 'src'),
  // };

  const srcPath = path.resolve(__dirname, '..', '..', 'src');

  config.resolve?.modules?.push(srcPath);
  config.resolve?.extensions?.push('.ts', '.tsx');
  config.module?.rules?.push(buildCssLoaders(true));
  config.plugins?.push(new DefinePlugin({
    __IS_DEV__: JSON.stringify(true),
  }));

  handleSvg(config);

  return config;
};

function handleSvg(config: Configuration) {
  const imageRule = config.module?.rules?.find((rule) =>
    (rule as { test: RegExp }).test?.test('.svg')) as { [key: string]: any };

  imageRule.exclude = /\.svg$/;

  config.module?.rules?.push({
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  });
}
