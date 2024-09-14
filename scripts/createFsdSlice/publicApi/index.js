const fs = require('fs/promises');
const { resolveSrcPath } = require('../helpers/resolveSrcPath');
const { getPublicApiFileTemplate } = require('./getPublicApiFileTemplate');

async function createPublicApiFile(layerName, sliceName) {
  try {
    await fs.writeFile(
      resolveSrcPath(layerName, sliceName, 'index.ts'),
      getPublicApiFileTemplate(sliceName),
    );
  } catch (error) {
    console.log('Failed creating public api index.js file');
  }
}

module.exports = { createPublicApiFile };
