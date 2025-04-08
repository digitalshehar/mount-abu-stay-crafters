
import React, { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileHeader from "@/components/layout/MobileHeader";
import MobileFooter from "@/components/layout/MobileFooter";
import { useResponsive } from "@/context/ResponsiveContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col min-h-screen">
      {isMobile ? <MobileHeader /> : <Header />}
      <main className={`flex-grow ${isMobile ? 'pt-14' : 'pt-16'}`}>{children}</main>
      {isMobile ? <MobileFooter /> : <Footer />}
    </div>
  );
};

export default Layout;
