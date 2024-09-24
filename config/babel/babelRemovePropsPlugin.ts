import { PluginItem } from '@babel/core';

function babelRemovePropsPlugin(): PluginItem {
  return {
    visitor: {
      Program(path, state) {
        const attrsToDelete = state.opts.props || [];

        path.traverse({
          JSXIdentifier(current) {
            const nodeName = current.node.name;

            if (attrsToDelete.includes(nodeName)) {
              current.parentPath.remove();
            }
          },
        });
      },
    },
  };
}

export default babelRemovePropsPlugin;
