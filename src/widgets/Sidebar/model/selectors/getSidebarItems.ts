import { createSelector } from '@reduxjs/toolkit';

import { RoutePath } from '@/app/providers/router/model/config/routeConfig';
import { getAuthUserData } from '@/entities/User';
import AboutSvg from '@/shared/assets/icons/about.svg';
import ArticlesSvg from '@/shared/assets/icons/articles.svg';
import MainSvg from '@/shared/assets/icons/main.svg';
import ProfileSvg from '@/shared/assets/icons/profile_link.svg';

import { SidebarLinkItem } from '../types/SidebarLink';

export const getSidebarItems = createSelector(getAuthUserData, (userData) => {
  const sidebarLinksList: SidebarLinkItem[] = [
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
  ];

  if (userData !== null) {
    sidebarLinksList.push(
      {
        path: RoutePath.profile + userData.id,
        text: 'profile',
        Icon: ProfileSvg,
        authOnly: true,
      },
      {
        path: RoutePath.articles,
        text: 'articles',
        Icon: ArticlesSvg,
        authOnly: true,
      },
    );
  }

  return sidebarLinksList;
});
