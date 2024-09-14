const fs = require('fs/promises');
const { getStylesTemplate } = require('./getStylesTemplate');

async function createStylesFile(resolveUiPath, sliceName) {
  try {
    await fs.writeFile(
      resolveUiPath(sliceName, `${sliceName}.module.scss`),
      getStylesTemplate(sliceName),
    );
  } catch (error) {
    console.log('Failed creating styles for component file', error);
  }
}

module.exports = { createStylesFile };
