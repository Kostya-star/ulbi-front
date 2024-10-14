import { createSelector } from '@reduxjs/toolkit';

import { getRouteAbout, getRouteArticles, getRouteMain, getRouteProfile } from '@/app/providers/router';
import { getAuthUserData } from '@/entities/User';
import AboutSvg from '@/shared/assets/icons/about.svg';
import ArticlesSvg from '@/shared/assets/icons/articles.svg';
import MainSvg from '@/shared/assets/icons/main.svg';
import ProfileSvg from '@/shared/assets/icons/profile_link.svg';

import { SidebarLinkItem } from '../types/SidebarLink';

export const getSidebarItems = createSelector(getAuthUserData, (userData) => {
  const sidebarLinksList: SidebarLinkItem[] = [
    {
      path: getRouteMain(),
      text: 'main',
      Icon: MainSvg,
    },
    {
      path: getRouteAbout(),
      text: 'about_us',
      Icon: AboutSvg,
    },
  ];

  if (userData !== null) {
    sidebarLinksList.push(
      {
        path: getRouteProfile(userData.id),
        text: 'profile',
        Icon: ProfileSvg,
        authOnly: true,
      },
      {
        path: getRouteArticles(),
        text: 'articles',
        Icon: ArticlesSvg,
        authOnly: true,
      },
    );
  }

  return sidebarLinksList;
});
