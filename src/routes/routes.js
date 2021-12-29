import React from "react";

import {Navigate} from "react-router-dom";

import Auth from "../containers/Auth/Auth";
import Markup from "../containers/Markup/Markup";
import Dashboard from "../components/Dashboard/Dashboard";
import Samples from "../containers/AdminContainers/Samples/Samples";
import AdminTasks from "../containers/AdminContainers/AdminTasks/AdminTasks";

const routes = (isAuthenticated, userType) => [
    {
      path: "*",
      element: !isAuthenticated ? <Auth /> : <Navigate to="/" />
    },
    {
        path: "/",
        element: isAuthenticated ? <Dashboard /> : <Navigate to="/auth" />
    },
    {
        path: '/markup',
        element: (isAuthenticated && userType === 'markup') ? <Markup /> : <Navigate to="/auth" />
    },
    {
        path: '/markup-tasks',
        element: (isAuthenticated && userType === 'markup') ? <Markup /> : <Navigate to="/auth" />
    },
    {
        path: '/samples',
        element: (isAuthenticated && userType === 'admin') ? <Samples /> : <Navigate to="/auth" />
    },
    {
        path: '/admin-tasks',
        element: (isAuthenticated && userType === 'admin') ? <AdminTasks /> : <Navigate to="/auth" />
    },
    {
        path: "/auth",
        element: !isAuthenticated ? <Auth /> : <Navigate to="/" />
    }
]

export default routes;
