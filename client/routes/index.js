import HomeView from 'pages/HomeView';
// import ErrorView from 'pages/ErrorView';

// Export global Path references for use in routing, redirection, etc.
export const appPaths = {
  home: '/home',
  logout: '/logout'
};

const routes = [
  {
    path: '/',
    exact: true,
    component: HomeView
  }
];

// routes = [
//   ...routes
//   // {
//   //   component: ErrorView,
//   //   layout: Error,
//   //   contentKey: 'pages.notFound'
//   // }
// ];

export default routes;
