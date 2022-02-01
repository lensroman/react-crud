import React from "react";

import {Navigate} from "react-router-dom";

import Auth from "../containers/Auth/Auth";
import Markup from "../containers/Markup/Markup";
import Dashboard from "../components/Dashboard/Dashboard";
import Datasets from "../containers/Datasets/Datasets";
import AdminTasks from "../containers/AdminTasks/AdminTasks";
import AdminTaskPage from '../components/AdminTask/AdminTask';
import DatasetPage from '../components/Dataset/Dataset';
import AdminUsers from '../containers/AdminUsers/AdminUsers';
import MarkupTasks from "../containers/MarkupTasks/MarkupTasks";
import MarkupTaskPage from "../components/MarkupTaskPage/MarkupTaskPage";

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
        element: (isAuthenticated && isStaff === true) ? <Datasets /> : <Navigate to="/auth" />
    },
    {
        path: '/samples/*',
        element: (isAuthenticated && isStaff === true) ? <DatasetPage /> : <Navigate to="/auth" />,
    },
    {
        path: '/admin-tasks',
        element: (isAuthenticated && isStaff === true) ? <AdminTasks /> : <Navigate to="/auth" />,
    },
    {
        path: '/admin-tasks/*',
        element: (isAuthenticated && isStaff === true) ? <AdminTaskPage /> : <Navigate to="/auth" />,
    },
    {
        path: '/admin-users',
        element: (isAuthenticated && isStaff === true) ? <AdminUsers /> : <Navigate to='/auth' />
    },
    {
        path: '/markup',
        element: (isAuthenticated && isStaff === false) ? <Markup /> : <Navigate to="/auth" />
    },
    {
        path: '/markup-tasks',
        element: (isAuthenticated && isStaff === false) ? <MarkupTasks /> : <Navigate to="/auth" />
    },
    {
        path: '/markup-tasks/*',
        element: (isAuthenticated && isStaff === false) ? <MarkupTaskPage /> : <Navigate to="/auth" />,
    },
    {
        path: "/auth",
        element: !isAuthenticated ? <Auth /> : <Navigate to="/" />
    }
]

export default routes;
