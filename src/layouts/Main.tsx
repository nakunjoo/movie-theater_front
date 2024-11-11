import MainHeader from "./Header";
import MainFooter from "./Footer";

export const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <MainHeader />
      <div className="w-full min-h-screen relative flex justify-center py-12 -mt-10">
        {children}
      </div>
      <MainFooter />
    </div>
  );
};
