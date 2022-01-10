import React from "react";

import {Navigate} from "react-router-dom";

import Auth from "../containers/Auth/Auth";
import Markup from "../containers/Markup/Markup";
import Dashboard from "../components/Dashboard/Dashboard";
import DataSets from "../containers/AdminContainers/DataSets/DataSets";
import AdminTasks from "../containers/AdminContainers/AdminTasks/AdminTasks";

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
        element: (isAuthenticated && isStaff) ? <DataSets /> : <Navigate to="/auth" />
    },
    {
        path: '/admin-tasks',
        element: (isAuthenticated && isStaff) ? <AdminTasks /> : <Navigate to="/auth" />
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
