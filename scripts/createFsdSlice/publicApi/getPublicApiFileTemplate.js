function getPublicApiFileTemplate(sliceName) {
  const schemaName = `${sliceName}Schema`;

  return `export { ${sliceName} } from './ui/${sliceName}/${sliceName}';
export { ${schemaName} } from './model/types/${schemaName}';
`;
}

module.exports = { getPublicApiFileTemplate };
