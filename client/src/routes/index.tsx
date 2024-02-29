import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from '../components/Loadable';

// todos page routing
const TodosPage = Loadable(lazy(() => import('../views/Beers')));

export default function Routes() {
    return useRoutes([
        {
            path: '/',
            element: <TodosPage />
        }
    ]);
}
