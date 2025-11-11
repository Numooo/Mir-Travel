import React from 'react';
import HeaderAdmin from "@/app/admin/HeaderAdmin";
import UpdatePage from "@/app/admin/[route]/[id]/UpdatePage";

const Page = () => {
    return (
        <div className="h-screen overflow-hidden">
            <HeaderAdmin />
            <UpdatePage/>
        </div>
    );
};

export default Page;