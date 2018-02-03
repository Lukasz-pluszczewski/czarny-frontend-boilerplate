import HomePage from 'pages/HomePage';
import ComponentsPage from 'pages/ComponentsPage';
import NotFoundPage from 'pages/NotFoundPage.js';

export default [
  {
    path: '/',
    component: HomePage,
    exact: true,
    onlyActiveOnIndex: true,
    name: 'home',
    icon: 'home',
  },
  {},
  {
    path: '/components',
    component: ComponentsPage,
    exact: true,
    name: 'components',
    icon: 'th-large',
  },
  {
    path: '*',
    component: NotFoundPage,
  },
];
