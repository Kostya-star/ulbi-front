import { Flex, FlexProps } from '../Flex/Flex';

type HStackProps = Omit<FlexProps, 'flexDirection'>;

export const HStack = (props: HStackProps) => {
  return <Flex flexDirection="row" {...props} />;
};
