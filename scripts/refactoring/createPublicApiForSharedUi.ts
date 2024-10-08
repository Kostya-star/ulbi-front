import path from 'path';
import { Project } from "ts-morph";

// Initialize the project
const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Get all the source files in the project
const sourceFiles = project.getSourceFiles();
const sharedUiPath = path.resolve(__dirname, '..', '..', 'src', 'shared', 'ui');
const sharedUiDirectory = project.getDirectory(sharedUiPath);
const sharedUiComponentsDir = sharedUiDirectory?.getDirectories();

sharedUiComponentsDir?.forEach((compUiDir) => {
  const indexFilePath = `${compUiDir.getPath()}/index.ts`;
  const indexFile = compUiDir.getSourceFile(indexFilePath);

  if (!indexFile) {
    const indexContents = `export * from './${compUiDir.getBaseName()}';
`;
    const newIndexFile = compUiDir.createSourceFile(indexFilePath, indexContents, { overwrite: true });
    newIndexFile.save();
  }
});

// Update import paths
sourceFiles.forEach((sourceFile) => {
  const imports = sourceFile.getImportDeclarations();

  imports.forEach((importDeclaration) => {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();
    const noAlias = moduleSpecifier.replace('@/', '');
    const parts = noAlias.split('/');
    const isSharedLayer = parts[0] === 'shared';
    const isUiSlice = parts[1] === 'ui';

    if (isImportAbsolute(noAlias) && isSharedLayer && isUiSlice) {
      const newImport = parts.slice(0, 3).join('/');
      importDeclaration.setModuleSpecifier(`@/${newImport}`);
    }
  });
});

// Save all changes
project.save();

function isImportAbsolute(imprt: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => imprt.startsWith(layer));
}
