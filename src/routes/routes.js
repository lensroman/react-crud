import React from 'react';

import { Navigate } from 'react-router-dom';

import Auth from '../containers/Auth/Auth';
import Markup from '../containers/Marker/Markup/Markup';
import Datasets from '../containers/Admin/Datasets/Datasets/Datasets';
import AdminTasks from '../containers/Admin/Tasks/AdminTasks/AdminTasks';
import AdminTaskPage from '../containers/Admin/Tasks/AdminTask/AdminTask';
import DatasetPage from '../containers/Admin/Datasets/Dataset/Dataset';
import AdminUsers from '../containers/Admin/Users/AdminUsers/AdminUsers';
import MarkupTasks from '../containers/Marker/Tasks/MarkupTasks/MarkupTasks';
import MarkupTaskPage from '../containers/Marker/Tasks/MarkupTask/MarkupTask';

const routes = (isAuthenticated, isStaff) => [
  {
    path: '*',
    element: !isAuthenticated ? <Auth /> : <Navigate to="/" />,
  },
  {
    path: '/',
    element: isStaff ? <Navigate to="/samples" /> : <Navigate to="/markup-tasks" />,
  },
  {
    path: '/samples',
    element: (isAuthenticated && isStaff === true) ? <Datasets /> : <Navigate to="/auth" />,
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
    element: (isAuthenticated && isStaff === true) ? <AdminUsers /> : <Navigate to="/auth" />,
  },
  {
    path: '/markup',
    element: (isAuthenticated && isStaff === false) ? <Markup /> : <Navigate to="/auth" />,
  },
  {
    path: '/markup-tasks',
    element: (isAuthenticated && isStaff === false) ? <MarkupTasks /> : <Navigate to="/auth" />,
  },
  {
    path: '/markup-tasks/*',
    element: (isAuthenticated && isStaff === false) ? <MarkupTaskPage /> : <Navigate to="/auth" />,
  },
  {
    path: '/auth',
    element: !isAuthenticated ? <Auth /> : <Navigate to="/" />,
  },
]

export default routes;
