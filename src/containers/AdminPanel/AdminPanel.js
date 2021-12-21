import React from "react";

import AdminPanelHeader from '../../components/AdminPanelHeader/AdminPanelHeader';
import Samples from "../../components/Samples/Samples";
import AdminTasks from "../../components/AdminTasks/AdminTasks";

import {Routes, Route} from "react-router-dom";

const AdminPanel = props => {

    return (
        <div>
            <AdminPanelHeader />
            <Routes>
                <Route path="/samples" element={<Samples />} />
                <Route path="/tasks" element={<AdminTasks />} />
            </Routes>
        </div>
    )
}

export default AdminPanel;