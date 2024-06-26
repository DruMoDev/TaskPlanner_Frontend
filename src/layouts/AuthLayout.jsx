import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto pt-32 p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-1/2">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default AuthLayout;
