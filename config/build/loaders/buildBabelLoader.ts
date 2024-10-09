import babelRemovePropsPlugin from '../../babel/babelRemovePropsPlugin';
import { BuildOptions } from '../types/config';

interface BuildOptionsArgs extends BuildOptions {
  isTsx?: boolean;
}

export function buildBabelLoader({ isDev, isTsx }: BuildOptionsArgs) {
  const isProd = !isDev;
  return {
    test: isTsx ? /\.(jsx|tsx)$/ : /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        // cacheDirectory: true,
        presets: ['@babel/preset-env'],
        plugins: [
          ["@babel/plugin-transform-typescript", {
            isTsx,
          }],
          "@babel/plugin-transform-runtime",
          // isTsx && "@babel/plugin-transform-typescript",
          isDev && require.resolve('react-refresh/babel'),
          isTsx && isProd && [
            babelRemovePropsPlugin,
            {
              props: ['data-testid'],
            },
          ],
        ].filter(Boolean),
      },
    },
  };
}
