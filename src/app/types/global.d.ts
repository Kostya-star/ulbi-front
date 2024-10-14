declare module '*.scss' {
  interface IClassNames {
    [className: string]: string;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

// declare module "*.svg" {
//   import React from "react";
//   const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
//   export default SVG;
// }

declare module '*.svg' {
  import React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;
declare const __PROJECT__: string;

declare type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
