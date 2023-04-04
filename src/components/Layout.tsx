import { FC } from "react";
import FollowBar from "./Layout/FollowBar";
import Sidebar from "./Layout/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-black">
      <div className="container h-full max-w-6xl mx-auto xl:px-30">
        <div className="grid h-full grid-cols-4">
          <Sidebar />
          <div className="col-span-3 lg:col-span-2 border-x border-neutral-800">
            {children}
          </div>
          <FollowBar />
        </div>
      </div>
    </div>
  );
};

export default Layout;
