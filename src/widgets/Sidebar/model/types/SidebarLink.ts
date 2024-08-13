import { VFC, SVGProps } from 'react';

export interface SidebarLinkItem {
  path: string;
  Icon: VFC<SVGProps<SVGSVGElement>>;
  text: string;
  authOnly?: boolean;
}
