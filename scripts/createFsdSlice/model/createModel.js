const fs = require('fs/promises');
const { resolveSrcPath } = require('../helpers/resolveSrcPath');
const { createReduxSlice } = require('./slice/createReduxSlice');
const { createTypeSchema } = require('./types/createTypeSchema');

async function createModel(layerName, sliceName) {
  const resolveModelPath = (...args) => resolveSrcPath(layerName, sliceName, 'model', ...args);

  await createModelFolderStructure(resolveModelPath);
  await createReduxSlice(resolveModelPath, sliceName);
  await createTypeSchema(resolveModelPath, sliceName);
}

async function createModelFolderStructure(resolveModelPath) {
  try {
    await fs.mkdir(resolveModelPath());
    await fs.mkdir(resolveModelPath('selectors'));
    await fs.mkdir(resolveModelPath('services'));
    await fs.mkdir(resolveModelPath('slices'));
    await fs.mkdir(resolveModelPath('types'));
  } catch (error) {
    console.log("Failed creating sub folders for 'model' folder", error);
  }
}

module.exports = { createModel };
