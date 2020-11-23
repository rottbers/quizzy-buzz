import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<Props> = ({ children, className }) => (
  <>
    <div className="standalone:h-5 bg-gray-900 w-full z-10 fixed" />
    <main
      className={`standalone:pt-10 container mx-auto p-4 min-h-screen flex flex-col items-center ${className}`}
    >
      {children}
    </main>
  </>
);

export default Layout;
