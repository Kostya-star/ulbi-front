import { Flex, FlexProps } from '../Flex/Flex';

type VStackProps = Omit<FlexProps, 'flexDirection'>;

export const VStack = (props: VStackProps) => {
  return <Flex flexDirection="column" {...props} />;
};
