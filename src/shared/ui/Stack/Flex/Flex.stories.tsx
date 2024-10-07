import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Flex } from './Flex';

export default {
  title: 'shared/Flex',
  component: Flex,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Flex>;

const Template: ComponentStory<typeof Flex> = (args) => <Flex {...args} />;

const flexNode = (
  <>
    <div>1</div>
    <div>2</div>
    <div>3</div>
  </>
);

export const noStyling = Template.bind({});
noStyling.args = {
  children: flexNode,
};

export const justifyContentStart = Template.bind({});
justifyContentStart.args = {
  children: flexNode,
  justifyContent: 'start',
  flexDirection: 'row',
};

export const justifyContentCenter = Template.bind({});
justifyContentCenter.args = {
  children: flexNode,
  flexDirection: 'row',
  justifyContent: 'center',
};

export const justifyContentEnd = Template.bind({});
justifyContentEnd.args = {
  children: flexNode,
  flexDirection: 'row',
  justifyContent: 'end',
};

export const justifyContentSpaceBetween = Template.bind({});
justifyContentSpaceBetween.args = {
  children: flexNode,
  flexDirection: 'row',
  justifyContent: 'between',
};

export const justifyContentAround = Template.bind({});
justifyContentAround.args = {
  children: flexNode,
  flexDirection: 'row',
  justifyContent: 'around',
};

export const flexDirectionRow = Template.bind({});
flexDirectionRow.args = {
  children: flexNode,
  flexDirection: 'row',
};

export const flexDirectionColumn = Template.bind({});
flexDirectionColumn.args = {
  children: flexNode,
  flexDirection: 'column',
};

export const noStylingGap2 = Template.bind({});
noStylingGap2.args = {
  children: flexNode,
  gap: '2',
};

export const noStylingGap4 = Template.bind({});
noStylingGap4.args = {
  children: flexNode,
  gap: '4',
};

export const noStylingGap8 = Template.bind({});
noStylingGap8.args = {
  children: flexNode,
  gap: '8',
};

export const noStylingGap16 = Template.bind({});
noStylingGap16.args = {
  children: flexNode,
  gap: '16',
};

export const noStylingGap32 = Template.bind({});
noStylingGap32.args = {
  children: flexNode,
  gap: '32',
};
