import React from 'react';
import DetailPage from "@/app/admin/[route]/DetailPage";
import HeaderAdmin from "@/app/admin/HeaderAdmin";

const Page = () => {
    return (
        <div className="h-screen overflow-hidden">
            <HeaderAdmin />
            <DetailPage/>
        </div>
    );
};

export default Page;