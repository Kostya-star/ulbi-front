import { ArticlesList, ArticlesView, ArticlesViewSwitcher } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ARTICLES_VIEW_LOCAL_STORAGE } from 'shared/const/localStorage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { getError, getIsLoading, getView } from '../../model/selectors/articlesPageSelectors';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import {
  articlesPageReducer, getArticles, setLimit, setView,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

// const article = {
//   id: "1",
//   title: "Javascript news sdkpfmpdsfmpdsokfsiofsiodfkoposkpfkop k pokdsfk ",
//   subtitle: "What's new in JS for 2022?",
//   img: "https://teknotower.com/wp-content/uploads/2020/11/js.png",
//   views: 1022,
//   createdAt: "02/26/2022",
//   user: {
//     id: '1',
//     username: 'Costya Danilov',
//     avatar: 'https://flomaster.top/o/uploads/posts/2024-02/1708339350_flomaster-top-p-multyashnii-kachok-pinterest-risunok-3.jpg',
//   },
//   type: [
//     "IT",
//     "ECONOMICS",
//     "POLITICS",
//     "SOME OTHER TYPE",
//   ],
//   blocks: [
//     {
//       id: "1",
//       type: "TEXT",
//       title: "Title of this block",
//       paragraphs: [
//         "The program traditionally called 'Hello, world!' is very simple. It outputs the phrase 'Hello, world!' or something similar using some language.",
//         "JavaScript is a language in which programs can be executed in various environments. In our case, it's about browsers and the server-side platform Node.js. If you haven't written a single line of JS code yet and you're reading this text in a browser on a desktop computer, that means you're literally seconds away from your first JavaScript program.",
//         "There are other ways to run JS code in a browser. For instance, when it comes to the usual use of JavaScript programs, they are loaded into the browser to make web pages work. Typically, the code is organized in separate files with a .js extension, which are linked to web pages, but the program code can also be embedded directly into the page's code. All this is done using the <script> tag. When the browser detects such code, it executes it. You can find details about the script tag on the w3school.com website. Specifically, let's look at an example demonstrating working with a webpage using JavaScript, provided on that site. This example can be run using the resources of the site (look for the Try it Yourself button), but we will do it a little differently. Namely, we will create a new file in some text editor (e.g., in VS Code or Notepad++) called hello.html and add the following code to it:",
//       ],
//     },
//     {
//       id: "4",
//       type: "CODE",
//       code: "<!DOCTYPE html>\n<html>\n  <body>\n    <p id=\"hello\"></p>\n\n    <script>\n      document.getElementById(\"hello\").innerHTML = \"Hello, world!\";\n    </script>\n  </body>\n</html>;",
//     },
//     {
//       id: "5",
//       type: "TEXT",
//       title: "Title of this block",
//       paragraphs: [
//         "The program traditionally called 'Hello, world!' is very simple. It outputs the phrase 'Hello, world!' or something similar using some language.",
//         "There are other ways to run JS code in a browser. For instance, when it comes to the usual use of JavaScript programs, they are loaded into the browser to make web pages work. Typically, the code is organized in separate files with a .js extension, which are linked to web pages, but the program code can also be embedded directly into the page's code. All this is done using the <script> tag. When the browser detects such code, it executes it. You can find details about the script tag on the w3school.com website. Specifically, let's look at an example demonstrating working with a webpage using JavaScript, provided on that site. This example can be run using the resources of the site (look for the Try it Yourself button), but we will do it a little differently. Namely, we will create a new file in some text editor (e.g., in VS Code or Notepad++) called hello.html and add the following code to it:",
//       ],
//     },
//     {
//       id: "2",
//       type: "IMAGE",
//       src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
//       title: "Figure 1 - website screenshot",
//     },
//     {
//       id: "3",
//       type: "CODE",
//       code: "const path = require('path');\n\nconst server = jsonServer.create();\n\nconst router = jsonServer.router(path.resolve(__dirname, 'db.json'));\n\nserver.use(jsonServer.defaults({}));\nserver.use(jsonServer.bodyParser);",
//     },
//     {
//       id: "7",
//       type: "TEXT",
//       title: "Title of this block",
//       paragraphs: [
//         "JavaScript is a language in which programs can be executed in various environments. In our case, it's about browsers and the server-side platform Node.js. If you haven't written a single line of JS code yet and you're reading this text in a browser on a desktop computer, that means you're literally seconds away from your first JavaScript program.",
//         "There are other ways to run JS code in a browser. For instance, when it comes to the usual use of JavaScript programs, they are loaded into the browser to make web pages work. Typically, the code is organized in separate files with a .js extension, which are linked to web pages, but the program code can also be embedded directly into the page's code. All this is done using the <script> tag. When the browser detects such code, it executes it. You can find details about the script tag on the w3school.com website. Specifically, let's look at an example demonstrating working with a webpage using JavaScript, provided on that site. This example can be run using the resources of the site (look for the Try it Yourself button), but we will do it a little differently. Namely, we will create a new file in some text editor (e.g., in VS Code or Notepad++) called hello.html and add the following code to it:",
//       ],
//     },
//     {
//       id: "8",
//       type: "IMAGE",
//       src: "https://hsto.org/r/w1560/getpro/habr/post_images/d56/a02/ffc/d56a02ffc62949b42904ca00c63d8cc1.png",
//       title: "Figure 1 - website screenshot",
//     },
//     {
//       id: "9",
//       type: "TEXT",
//       title: "Title of this block",
//       paragraphs: [
//         "JavaScript is a language in which programs can be executed in various environments. In our case, it's about browsers and the server-side platform Node.js. If you haven't written a single line of JS code yet and you're reading this text in a browser on a desktop computer, that means you're literally seconds away from your first JavaScript program.",
//       ],
//     },
//   ],
// } as Article;

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
  useReduxReducerManager(reducers);

  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const view = useSelector(getView);

  useConditionalEffect(() => {
    const lsView = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE) || ArticlesView.SMALL;
    dispatch(setView(lsView as ArticlesView));

    const limit = lsView === ArticlesView.SMALL ? 9 : 4;
    dispatch(setLimit(limit));

    dispatch(fetchArticles({
      page: 1,
    }));
  });

  const onChangeView = useCallback((view: ArticlesView) => {
    dispatch(setView(view));
    localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE, view);
  }, [dispatch]);

  const loadMoreArticles = useCallback(() => {

  }, []);

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <Page
      className={classNames(cls.ArticlesPage, {}, [className])}
      onScrollEnd={loadMoreArticles}
    >
      <ArticlesViewSwitcher view={view} onViewClick={onChangeView} />
      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        view={view}
      />
    </Page>
  );
});

export default ArticlesPage;
