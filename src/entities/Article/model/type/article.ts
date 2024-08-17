interface ArticleBlockBase {
  id: string;
  type: string;
}

interface ArticleBlockImg extends ArticleBlockBase {
  src: string;
  title: string;
}

interface ArticleBlockCode extends ArticleBlockBase {
  code: string;
}

interface ArticleBlockText extends ArticleBlockBase {
  title: string;
  paragraphs: string[];
}

type ArticleBlock = ArticleBlockImg | ArticleBlockCode | ArticleBlockText

export enum ArticleType {
  IT = 'IT',
  SCIENCE = 'SCIENCE',
  ECONOMICS = 'ECONOMICS',
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  img: string;
  views: number;
  createdAt: string;
  type: ArticleType[]
  blocks: ArticleBlock[];
}
