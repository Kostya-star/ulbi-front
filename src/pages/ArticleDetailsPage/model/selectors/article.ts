import { createSelector } from '@reduxjs/toolkit';

import { getArticleDetailsData } from '@/entities/Article';
import { getAuthUserData } from '@/entities/User';

export const getUserCanEditArticle = createSelector(
  getAuthUserData,
  getArticleDetailsData,
  (user, article) => {
    if (!user || !article) return false;
    return user.id === article.user.id;
  },
);
