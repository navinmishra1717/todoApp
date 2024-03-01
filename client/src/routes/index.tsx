import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from '../components/Loadable';

// todos page routing
const TodoPage = Loadable(lazy(() => import('../views/Todos')));

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <TodoPage />
        }
    ]);
}
