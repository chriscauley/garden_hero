import HomeView from 'pages/HomeView';
import SignupView from 'pages/SignupView';
import ErrorView from 'pages/ErrorView';

// Export global Path references for use in routing, redirection, etc.
export const appPaths = {
  home: '/home',
  login: '/login',
  logout: '/logout',
  signup: '/signup'
};

let routes = [
  {
    path: '/',
    exact: true,
    component: HomeView
  },
  {
    path: appPaths.signup,
    exact: true,
    component: SignupView
  },
  {
    path: appPaths.login,
    exact: true,
    component: SignupView
  }
];

// Catch-all 404 Error Page
routes = [
  ...routes,
  {
    component: ErrorView
  }
];

export default routes;
