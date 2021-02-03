import createRouteUrlProvider from 'utils/routeUrlProvider';

export const LOGIN = 'LOGIN';
export const DASHBOARD = 'DASHBOARD';
export const USER_LIST = 'USER_LIST';
export const USER_CREATE = 'USER_CREATE';
export const USER_EDIT = 'USER_EDIT';
export const USER_REGISTER = 'USER_REGISTER';

export const PRODUCT_TABLE = 'PRODUCT_TABLE';

const routeUrlProvider = createRouteUrlProvider();

routeUrlProvider.set(LOGIN, '/');
routeUrlProvider.set(DASHBOARD, '/dashboard');
routeUrlProvider.set(USER_LIST, '/user');
routeUrlProvider.set(USER_CREATE, '/user/create');
routeUrlProvider.set(USER_EDIT, '/user/:userId/edit');
routeUrlProvider.set(USER_REGISTER, '/user/register');

routeUrlProvider.set(PRODUCT_TABLE, '/products');

export default routeUrlProvider;
