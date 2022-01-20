import React from "react";

import {Navigate} from "react-router-dom";

import Auth from "../containers/Auth/Auth";
import Markup from "../containers/Markup/Markup";
import Dashboard from "../components/Dashboard/Dashboard";
import Datasets from "../containers/Datasets/Datasets";
import AdminTasks from "../containers/AdminTasks/AdminTasks";
import TaskPage from '../components/TaskPage/TaskPage';
import DatasetPage from '../components/DatasetPage/DatasetPage';
import AdminUsers from '../containers/AdminUsers/AdminUsers';

const routes = (isAuthenticated, isStaff) => [
    {
      path: "*",
      element: !isAuthenticated ? <Auth /> : <Navigate to="/" />
    },
    {
        path: "/",
        element: isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />
    },
    {
        path: '/samples',
        element: (isAuthenticated && isStaff) ? <Datasets /> : <Navigate to="/auth" />
    },
    {
        path: '/samples/*',
        element: (isAuthenticated && isStaff) ? <DatasetPage /> : <Navigate to="/auth" />,
    },
    {
        path: '/admin-tasks',
        element: (isAuthenticated && isStaff) ? <AdminTasks /> : <Navigate to="/auth" />,
    },
    {
        path: '/admin-tasks/*',
        element: (isAuthenticated && isStaff) ? <TaskPage /> : <Navigate to="/auth" />,
    },
    {
        path: '/admin-users',
        element: (isAuthenticated && isStaff) ? <AdminUsers /> : <Navigate to='/auth' />
    },
    {
        path: '/markup',
        element: (isAuthenticated && !isStaff) ? <Markup /> : <Navigate to="/auth" />
    },
    {
        path: '/markup-tasks',
        element: (isAuthenticated && !isStaff) ? <Markup /> : <Navigate to="/auth" />
    },
    {
        path: "/auth",
        element: !isAuthenticated ? <Auth /> : <Navigate to="/" />
    }
]

export default routes;
