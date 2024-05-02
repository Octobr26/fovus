import { ReactNode } from "react";
import { Header } from "./Header";

const MainLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="main-layout dark:bg-gray-900">
            <Header />

            <div>{children}</div>
        </div>
    );
};

export default MainLayout;
