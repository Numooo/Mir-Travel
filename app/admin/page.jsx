import React from 'react';
import AdminPage from "@/app/admin/AdminPage";
import HeaderAdmin from "@/app/admin/HeaderAdmin";

const Page = () => {
    return (
        <div className="h-screen overflow-hidden">
            <HeaderAdmin />
            <AdminPage />
        </div>
    );
};

export default Page;