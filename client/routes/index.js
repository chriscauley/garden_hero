import HomeView from 'pages/HomeView';
import ErrorView from 'pages/ErrorView';

// Export global Path references for use in routing, redirection, etc.
export const appPaths = {
  home: '/home',
  logout: '/logout'
};

let routes = [
  {
    path: '/',
    exact: true,
    component: HomeView
  }
];

// Catch-all 404 Error Page
routes = [
  ...routes,
  {
    component: ErrorView,
    layout: Error
  }
];

export default routes;
