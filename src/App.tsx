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
import EditItem from "./pages/items/edit";
import { Theme } from "@radix-ui/themes";
import CreateCustomer from "./pages/customers/create";
import EditCustomer from "./pages/customers/edit";
import Items from "./pages/items";
import { Toaster } from "react-hot-toast";
import ItemGroup from "./pages/item-group";
import CreateItemGroup from "./pages/item-group/create";

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

    return (
      <>
        {children}
        <Toaster />
      </>
    );
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
              <Route path='/item/create/:createId' element={<CreateItem />} />
              <Route path='/item/edit/:itemId' element={<EditItem />} />
              <Route path='/item-group' element={<ItemGroup />} />
              <Route
                path='/item-group/create/:createId'
                element={<CreateItemGroup />}
              />
              <Route path='/customers' element={<Customers />} />
              <Route
                path='/customer/create/:createId'
                element={<CreateCustomer />}
              />
              <Route
                path='/customer/edit/:customerId'
                element={<EditCustomer />}
              />
            </Routes>
          </AuthWrapper>
        </Router>
      </FrappeProvider>
    </Theme>
  );
};

export default App;
