import { ReactNode } from "react";

const Container = ({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) => {
  return (
    <main className="w-full max-w-2xl mx-auto pt-10 md:pt-16 px-4 sm:px-6 lg:px-8">
      {children}
      {sidebar}
    </main>
  );
};

export default Container;
