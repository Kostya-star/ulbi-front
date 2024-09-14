const fs = require('fs/promises');
const { getStoriesTemplate } = require('./getStoriesTemplate');

async function createStoriesFile(resolveUiPath, layerName, sliceName) {
  try {
    await fs.writeFile(
      resolveUiPath(sliceName, `${sliceName}.stories.tsx`),
      getStoriesTemplate(layerName, sliceName),
    );
  } catch (error) {
    console.log('Failed creating stories file for ui component', error);
  }
}

module.exports = { createStoriesFile };
