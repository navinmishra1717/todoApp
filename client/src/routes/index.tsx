import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from '../components/Loadable';

// todos page routing
const TodoPage = Loadable(lazy(() => import('../views/Todos')));
const UserListPage = Loadable(lazy(() => import('../views/Users')));

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <TodoPage />
        },
        {
            path: '/users',
            element: <UserListPage />
        }
    ]);
}
