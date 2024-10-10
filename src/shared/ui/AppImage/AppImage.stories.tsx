// /* eslint-disable react/prop-types */
// import React, { memo, useLayoutEffect, useState } from 'react';

// import { ComponentMeta } from '@storybook/react';

// import { AppImage } from './AppImage';
// // import { Skeleton } from '../Skeleton';

// export default {
//   /* 👇 The title prop is optional.
//   * See https://storybook.js.org/docs/6/configure#configure-story-loading
//   * to learn how to generate automatic titles
//   */
//   title: 'shared/AppImage',
//   component: AppImage,
// } as ComponentMeta<typeof AppImage>;

// // const Primary: ComponentStory<typeof AppImage> = (args) => <AppImage {...args} />;

// export const isLoading = () => {
//   // return <AppImage src={AvatarImg} fallbackLoading={<div>Loading...</div>} />;
//   return (
//     <img
//       src={AvatarImg}
//       alt={alt}
//       className={className}
//       {...otherProps}
//     />
//   );
// };

// export const AppImageComp = memo(({
//   className,
//   fallbackLoading,
//   fallbackError,
//   src,
//   alt = 'some image should be here...',
//   ...otherProps
// }) => {
//   const [isLoading, setLoading] = useState(false);
//   const [isError, setError] = useState(false);

//   useLayoutEffect(() => {
//     const image = new Image();
//     image.src = src ?? '';

//     image.onloadstart = () => {
//       setLoading(true);
//       setError(false);
//     };

//     image.onload = () => {
//       setLoading(false);
//       setError(false);
//     };

//     image.onerror = () => {
//       setLoading(false);
//       setError(true);
//     };
//   }, [src]);

//   if (!isLoading && !fallbackLoading) {
//     return fallbackLoading;
//   }

//   if (isError && fallbackError) {
//     return fallbackError;
//   }

//   return (
//     <img
//       src={src}
//       alt={alt}
//       className={className}
//       {...otherProps}
//     />
//   );
// });

// // const ButtonWithHooks = () => {
// //   // Sets the hooks for both the label and primary props
// //   const [value, setValue] = useState('Secondary');
// //   const [isPrimary, setIsPrimary] = useState(false);

// //   // Sets a click handler to change the label's value
// //   const handleOnChange = () => {
// //     if (!isPrimary) {
// //       setIsPrimary(true);
// //       setValue('Primary');
// //     }
// //   };
// //   return <button type='button'>BUTTOON!!</button>;
// // };

// // export const normal = ComponentStory<typeof Button> = (args) => <Button primary>Button</Button>;
// // export const normal = Template.bind({});
// // normal.args = {
// //   // src: AvatarImg,
// //   // fallbackLoading: <Skeleton width='100px' height='100px' borderRadius='50%' />,
// //   // children: 'App Link Text',
// //   // theme: AppLinkTheme.PRIMARY,
// // };
// // normal.render = () => <ButtonWithHooks />;
