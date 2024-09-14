const fs = require('fs/promises');

async function createUiFolder(resolveUiPath) {
  try {
    await fs.mkdir(resolveUiPath());
  } catch (error) {
    console.log('Failed creating ui folder', error);
  }
}

module.exports = { createUiFolder };
