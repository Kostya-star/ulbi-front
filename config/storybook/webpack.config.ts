import path from 'path';
import { Configuration } from 'webpack';
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

  return config;
};
