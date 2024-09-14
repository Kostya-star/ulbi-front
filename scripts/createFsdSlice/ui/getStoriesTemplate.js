function getStoriesTemplate(layerName, sliceName) {
  return `import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ${sliceName} } from './${sliceName}';

export default {
    title: '${layerName}/${sliceName}',
    component: ${sliceName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof ${sliceName}>;

const Template: ComponentStory<typeof ${sliceName}> = (args) => <${sliceName} {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};`;
}

module.exports = { getStoriesTemplate };
