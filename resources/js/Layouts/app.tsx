import { FC, Fragment, useEffect } from "react";

import Footer from "./layoutcomponents/footer";
import Header from "./layoutcomponents/header";
import Switcher from "./layoutcomponents/switcher";
import * as SwitcherData from "../commondata/switcherdata";
import BacktoTop from "./layoutcomponents/backtotop";
import { Sidebar } from "./layoutcomponents/sidebar";
import { Toaster } from "react-hot-toast";

export interface props {
    children?: React.ReactNode;
}

const AppLayout = ({ children }: props) => {
    document
        .querySelector("body")
        ?.classList.remove("login-img", "landing-page", "horizontal");
    document
        .querySelector("body")
        ?.classList.add("app", "sidebar-mini", "ltr", "light-mode");

    useEffect(() => {
        if (localStorage.getItem("sashdarktheme")) {
            document.querySelector("body")?.classList.add("dark-mode");
        } else {
            document.querySelector("body")?.classList.remove("dark-mode");
        }
    }, []);

    return (
        <Fragment>
            <div className="horizontalMenucontainer">
                <Switcher />
                <div className="page">
                    <div className="page-main">
                        <Header />
                        <div className="sticky" style={{ paddingTop: "-74px" }}>
                            <Sidebar />
                        </div>
                        <div
                            className="jumps-prevent"
                            style={{ paddingTop: "74px" }}
                        ></div>
                        <div
                            className="main-content app-content mt-0"
                            onClick={() =>
                                SwitcherData.responsiveSidebarclose()
                            }
                        >
                            <div className="side-app">
                                <div className="main-container container-fluid">
                                    <Toaster />
                                    {children}
                                </div>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </div>

                <BacktoTop />
            </div>
        </Fragment>
    );
};

export default AppLayout;
