import React from "react";

import AdminPanelHeader from '../../components/AdminPanelHeader/AdminPanelHeader';
import Samples from "../../components/Samples/Samples";

const AdminPanel = props => {

    return (
        <div>
            <AdminPanelHeader />
            <Samples />
        </div>
    )
}

export default AdminPanel;