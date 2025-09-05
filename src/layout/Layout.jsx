import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout = () => {
    return(
        <div className="w-full">
            <Header/>
            <main>
                
                <Outlet />
            </main>
        </div>
    )
}

export default Layout;