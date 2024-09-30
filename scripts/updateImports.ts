import { Project } from "ts-morph";

// Initialize the project
const project = new Project({});

project.addSourceFilesAtPaths('src/**/*.ts');
project.addSourceFilesAtPaths('src/**/*.tsx');

// Get all the source files in the project
const sourceFiles = project.getSourceFiles();

// Update import paths
sourceFiles.forEach((sourceFile) => {
  const imports = sourceFile.getImportDeclarations();

  imports.forEach((importDeclaration) => {
    const moduleSpecifier = importDeclaration.getModuleSpecifierValue();

    if (isImportAbsolute(moduleSpecifier)) {
      importDeclaration.setModuleSpecifier(`@/${moduleSpecifier}`);
    }
  });
});

// Save all changes
project.save();

function isImportAbsolute(imprt: string) {
  const layers = ['app', 'shared', 'entities', 'features', 'widgets', 'pages'];
  return layers.some((layer) => imprt.startsWith(layer));
}
