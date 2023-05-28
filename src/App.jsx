import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";

import ProtectedRoute from "./layouts/ProtectedRoute";
import Projects from "./pages/Projects";
import NewProject from "./pages/NewProject";
import { AuthProvider } from "./context/AuthProvider";
import { ProjectsProvider } from "./context/ProjectsProvider";
import Project from "./pages/Project";
import EditProject from "./pages/EditProject";
import NewMember from "./pages/NewMember";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProjectsProvider>
          <Routes>
            <Route element={<AuthLayout />} path="/">
              <Route index element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route
                path="confirm-account/:token"
                element={<ConfirmAccount />}
              />
            </Route>
            <Route element={<ProtectedRoute />} path="/projects">
              <Route index element={<Projects />} />
              <Route path="new-project" element={<NewProject />} />
              <Route path=":_id" element={<Project />} />
              <Route path="edit/:_id" element={<EditProject />} />
              <Route path="new-member/:_id" element={<NewMember />} />
            </Route>
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
