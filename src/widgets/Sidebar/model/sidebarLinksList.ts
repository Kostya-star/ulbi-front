import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import MainSvg from 'shared/assets/icons/main.svg';
import AboutSvg from 'shared/assets/icons/about.svg';
import ProfileSvg from 'shared/assets/icons/profile_link.svg';
import { SidebarLinkItem } from './types/SidebarLink';

export const sidebarLinksList: SidebarLinkItem[] = [
  {
    path: RoutePath.main,
    text: 'main',
    Icon: MainSvg,
  },
  {
    path: RoutePath.about,
    text: 'about_us',
    Icon: AboutSvg,
  },
  {
    path: RoutePath.profile,
    text: 'profile',
    Icon: ProfileSvg,
  },
];
