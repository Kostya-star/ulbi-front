import path from 'path';

import { Configuration } from 'webpack';

import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildMode, BuildPaths } from './config/build/types/config';

const paths: BuildPaths = {
  entry: path.resolve(__dirname, 'src', 'index.tsx'),
  build: path.resolve(__dirname, 'build'),
  html: path.resolve(__dirname, 'public', 'index.html'),
  src: path.resolve(__dirname, 'src'),
  locales: path.resolve(__dirname, 'public', 'locales'),
  buildLocales: path.resolve(__dirname, 'build', 'locales'),
};

export default (env: BuildEnv): Configuration => {
  const MODE: BuildMode = env?.mode || 'development';
  const PORT = env?.port || 3000;

  const isDev = MODE === 'development';

  const apiUrl = env?.apiUrl || 'http://localhost:8000';

  return buildWebpackConfig({
    mode: MODE,
    paths,
    isDev,
    port: PORT,
    apiUrl,
    project: 'frontend',
  });
};
