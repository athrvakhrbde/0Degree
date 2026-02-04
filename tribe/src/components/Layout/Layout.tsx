import React from "react";
import Navbar from "../../Navbar/Navbar";

type LayoutProps = {
  children: any;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ 
        paddingTop: "56px", 
        minHeight: "calc(100vh - 56px)",
        width: "100%",
        overflowX: "hidden"
      }}>
        {children}
      </main>
    </>
  );
};

export default Layout;
