const fs = require('fs/promises');
const { firstCharToLowerCase } = require('../../helpers/firstCharToLowerCase');
const { getReduxSliceTemplate } = require('./getReduxSliceTemplate');

async function createReduxSlice(resolveModelPath, sliceName) {
  try {
    await fs.writeFile(
      resolveModelPath('slices', `${firstCharToLowerCase(sliceName)}Slice.ts`),
      getReduxSliceTemplate(sliceName),
    );
  } catch (error) {
    console.log("Failed creating redux slice file for 'model' folder", error);
  }
}

module.exports = { createReduxSlice };
