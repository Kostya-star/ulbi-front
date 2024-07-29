import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Modal } from './Modal';

export default {
  title: 'shared/Modal',
  component: Modal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Modal>;

const Template: ComponentStory<typeof Modal> = (args) => <Modal {...args} />;

const modalOptions = {
  isOpen: true,
  children: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, exercitationem? Excepturi id perspiciatis in quae odio obcaecati tempore, facere nihil beatae ex delectus accusamus, quam debitis alias commodi, labore similique.',
};

export const ModalLight = Template.bind({});
ModalLight.args = modalOptions;
// ModalLight.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.LIGHT)];

export const ModalDark = Template.bind({});
ModalDark.args = modalOptions;
ModalDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
