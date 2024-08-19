import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { FrappeProvider, useFrappeAuth } from "frappe-react-sdk";
import LoginForm from "./components/LoginForm";
import MainLayout from "./components/MainLayout";

const App: React.FC = () => {
  const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const navigate = useNavigate();
    const { currentUser, isLoading } = useFrappeAuth();

    useEffect(() => {
      if (!isLoading) {
        // navigate('/login');
        if (!currentUser) {
          // No authenticated user, redirect to login
          navigate("/login");
        } else {
          // If user is logged in, ensure they're on /app
          const currentPath = window.location.pathname;
          if (currentPath === "/login" || currentPath === "/") {
            navigate("/app"); // Redirect to /app if authenticated
          }
        }
      }
    }, [isLoading]);

    // Render the children only if we have determined the user's auth state
    if (isLoading) {
      return <div>Loading...</div>; // Display loading state while determining auth status
    }

    return <>{children}</>;
  };

  return (
    <FrappeProvider
      url={import.meta.env.VITE_FRAPPE_URL as string}
      enableSocket={false}
    >
      <Router>
        <AuthWrapper>
          <Routes>
            <Route path='/' element={<LoginForm />} />
            <Route path='/app/*' element={<MainLayout />} />
            <Route path='/login' element={<LoginForm />} />
          </Routes>
        </AuthWrapper>
      </Router>
    </FrappeProvider>
  );
};

export default App;
