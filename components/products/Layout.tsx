// import Footer from './Footer';
import { ReactNode } from 'react';
import RouteHeader from './RouteHeader';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
   <RouteHeader/>
      <main className="flex-grow">{children}</main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;