const { resolveSrcPath } = require('../helpers/resolveSrcPath');
const { createComponentFile } = require('./createComponentFile');
const { createComponentFolder } = require('./createComponentFolder');
const { createStoriesFile } = require('./createStoriesFile');
const { createStylesFile } = require('./createStylesFile');
const { createUiFolder } = require('./createUiFolder');

async function createUi(layerName, sliceName) {
  const resolveUiPath = (...args) => resolveSrcPath(layerName, sliceName, 'ui', ...args);

  await createUiFolder(resolveUiPath);
  await createComponentFolder(resolveUiPath, sliceName);
  await createComponentFile(resolveUiPath, sliceName);
  await createStylesFile(resolveUiPath, sliceName);
  await createStoriesFile(resolveUiPath, layerName, sliceName);
}

module.exports = { createUi };
