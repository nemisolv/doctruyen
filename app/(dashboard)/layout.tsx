import { Header } from "@/components/header";
import { LeftSidebar } from "@/components/left-sidebar";
import React from "react";

const layout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <main className="relative">
            <Header/>
            <div className="flex">
                <div><LeftSidebar/></div>
                <div className="flex min-h-screen flex-1 flex-col w-full sm:ml-64">
                <div className="mx-auto max-w-5xl mt-16 w-full ">{children}</div>
                </div>
            </div>
        </main>
     );
}
 
export default layout;