function getTypeSchemaTemplate(sliceName) {
  return `export interface ${sliceName}Schema {}
`;
}

module.exports = { getTypeSchemaTemplate };
