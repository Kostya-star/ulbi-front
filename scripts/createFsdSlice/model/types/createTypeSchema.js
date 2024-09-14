const fs = require('fs/promises');
const { getTypeSchemaTemplate } = require('./getTypeSchemaTemplate');

async function createTypeSchema(resolveModelPath, sliceName) {
  try {
    await fs.writeFile(
      resolveModelPath('types', `${sliceName}Schema.ts`),
      getTypeSchemaTemplate(sliceName),
    );
  } catch (error) {
    console.log(`Failed creating type schema for model folder`, error);
  }
}

module.exports = { createTypeSchema };
