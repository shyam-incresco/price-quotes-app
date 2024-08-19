import React, { useState } from 'react';
import { useFrappeAuth } from 'frappe-react-sdk';
import { Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = lazy(() => import('./Dashboard'));
const Quotations = lazy(() => import('./Quotations'));
const Settings = lazy(() => import('./Settings'));

const MainLayout: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard'); // Default to Dashboard
  const { logout } = useFrappeAuth(); // Access the logout function from useFrappeAuth hook
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); // Attempt to log out from Frappe backend
  
      // Proceed to clear session data and redirect regardless of API success or failure
      localStorage.removeItem('authToken'); // Clear the auth token from localStorage
      localStorage.removeItem('currentUser'); // Clear the currentUser from localStorage
      navigate('/login'); // Redirect to the login page
    } catch (error: any) { // Use 'any' type for error
      const httpStatus = error?.httpStatus;
      const exception = error?.exception;
  
      if (httpStatus === 401 || exception === 'frappe.exceptions.AuthenticationError') {
        // Handle session expiration gracefully
        console.warn('Session expired. Proceeding with local logout.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
        navigate('/login'); // Redirect to login
      } else {
        console.error('Failed to logout:', error); // Log any other errors
      }
    }
  };
  
  

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'quotations':
        return <Quotations />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="main-layout">
      <header>
        <h1>CRM Console</h1>
        <nav>
          <ul>
            <li>
              <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
            </li>
            <li>
              <button onClick={() => setActiveTab('quotations')}>Quotations</button>
            </li>
            <li>
              <button onClick={() => setActiveTab('settings')}>Settings</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button> {/* Logout button with the handleLogout function */}
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          {renderTabContent()}
        </Suspense>
      </main>
    </div>
  );
};

export default MainLayout;
