import HomePage from 'pages/HomePage';
import ExamplePage from 'pages/ExamplePage';
import NotFoundPage from 'pages/NotFoundPage.js';

export default [
  {
    id: 'home',
    path: '/',
    component: HomePage,
    exact: true,
    onlyActiveOnIndex: true,
    name: 'home',
    icon: 'home',
  },
  {},
  {
    id: 'example',
    path: '/example',
    component: ExamplePage,
    exact: true,
    name: 'example',
    icon: 'th-large',
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
