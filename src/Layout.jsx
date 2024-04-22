import { Outlet } from "react-router-dom";
import TopBar from "./components/TopBar";
import LeftSideBar from "./components/LeftSideBar";
import Bottombar from "./components/BottomBar";

const Layout = () => {
  return (
    <div className="w-[100vw] h-[100vh] md:flex">
      <TopBar />
      <LeftSideBar/>
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      <Bottombar />
    </div>
  );
};

export default Layout;