import { Routes, Route, Navigate } from "react-router-dom";
import { Home, SignIn, SignUp } from "./modules";
import AuthLayout from "./assets/common/authLayout";

const Router = () => {
  return (
    <main className="flex h-screen">
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Navigate to={"/sign-in"} replace />} />
      </Routes>
    </main>
  );
};

export default Router;
