import React from "react";
import Navbar from "../../Navbar/Navbar";

type LayoutProps = {
  children: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "64px", minHeight: "calc(100vh - 64px)" }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
