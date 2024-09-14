const fs = require('fs/promises');
const { getComponentTsxTemplate } = require('./getComponentTsxTemplate');

async function createComponentFile(resolveUiPath, sliceName) {
  try {
    await fs.writeFile(
      resolveUiPath(sliceName, `${sliceName}.tsx`),
      getComponentTsxTemplate(sliceName),
    );
  } catch (error) {
    console.log('Failed creating file component', error);
  }
}

module.exports = { createComponentFile };
