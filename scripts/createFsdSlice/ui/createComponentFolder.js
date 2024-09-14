const fs = require('fs/promises');

async function createComponentFolder(resolveUiPath, sliceName) {
  try {
    await fs.mkdir(resolveUiPath(sliceName));
  } catch (error) {
    console.log('Failed creating ui component folder', error);
  }
}

module.exports = { createComponentFolder };
