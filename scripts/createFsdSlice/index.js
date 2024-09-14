const fs = require('fs/promises');
const { resolveSrcPath } = require('./helpers/resolveSrcPath');
const { createModel: createModelContents } = require('./model/createModel');
const { createUi: createUiContents } = require('./ui/createUi');
const { createPublicApiFile } = require('./publicApi');

const availableLayers = ['pages', 'widgets', 'features', 'entities'];

const create = async () => {
  const layerName = process.argv[2];
  const sliceName = process.argv[3];

  if (!layerName || !availableLayers.includes(layerName)) {
    throw new Error(`Provide one of the layers: ${availableLayers.map((layer) => `'${layer}'`).join(' or ')}`);
  }

  if (!sliceName) {
    throw new Error('Provide a slice name');
  }

  try {
    await createFsdSliceFolder(layerName, sliceName);
    await createModelContents(layerName, sliceName);
    await createUiContents(layerName, sliceName);
    await createPublicApiFile(layerName, sliceName);
  } catch (error) {
    console.log('Something went wrong. Could not create the directory', error);
  }
};

create();

async function createFsdSliceFolder(layerName, sliceName) {
  try {
    await fs.mkdir(resolveSrcPath(layerName, sliceName));
  } catch (error) {
    console.log(`Failed to create slice '${sliceName}' inside '${layerName}' layer`, error);
    throw error;
  }
}
