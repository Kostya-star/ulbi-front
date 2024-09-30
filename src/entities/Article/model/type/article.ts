import { User } from '@/entities/User';
import { ArticleBlockType, ArticleType } from '../const/article';

interface ArticleBlockBase {
  id: string;
  type: ArticleBlockType;
}

export interface ArticleBlockImg extends ArticleBlockBase {
  type: ArticleBlockType.IMAGE;
  src: string;
  title: string;
}

export interface ArticleBlockCode extends ArticleBlockBase {
  type: ArticleBlockType.CODE;
  code: string;
}

export interface ArticleBlockText extends ArticleBlockBase {
  type: ArticleBlockType.TEXT;
  title?: string;
  paragraphs: string[];
}

export type ArticleBlock = ArticleBlockImg | ArticleBlockCode | ArticleBlockText

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  user: User;
  type: ArticleType[];
  blocks: ArticleBlock[];
}
