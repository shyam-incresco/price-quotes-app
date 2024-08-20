import React, { useEffect } from "react";
import "@radix-ui/themes/styles.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { FrappeProvider, useFrappeAuth } from "frappe-react-sdk";
import "@radix-ui/themes/styles.css";
import Login from "./pages/auth/login";
import Quotes from "./pages/quotes";
import Customers from "./pages/customers";
import CreateItem from "./pages/items/create";
import { Theme } from "@radix-ui/themes";
import EditItem from "./pages/items/edit";
import CreateCustomer from "./pages/customers/create";
import EditCustomer from "./pages/customers/edit";
import Items from "./pages/items";

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
            navigate("/items"); // Redirect to /app if authenticated
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
    <Theme appearance='light' accentColor='iris' panelBackground='translucent'>
      <FrappeProvider
        url={import.meta.env.VITE_FRAPPE_URL as string}
        enableSocket={false}
      >
        <Router>
          <AuthWrapper>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/quotes' element={<Quotes />} />
              <Route path='/items' element={<Items />} />
              <Route path='/item/create/:id' element={<CreateItem />} />
              <Route path='/item/edit/:id' element={<EditItem />} />
              <Route path='/customers' element={<Customers />} />
              <Route path='/customer/create/:id' element={<CreateCustomer />} />
              <Route path='/customer/edit/:id' element={<EditCustomer />} />
            </Routes>
          </AuthWrapper>
        </Router>
      </FrappeProvider>
    </Theme>
  );
};

export default App;
