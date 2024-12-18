import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './pages/Login';
import Register from './pages/Register';
import MFASetup from './pages/MFASetup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Settings from './pages/Settings';
import Header from './components/Header';
import { RootState } from './store/store';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const userRole = useSelector((state: RootState) => state.auth.userRole);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Switch>
            <Route exact path="/" render={() => (
              isAuthenticated ? <Redirect to="/dashboard" /> : <Redirect to="/login" />
            )} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/mfa-setup" component={MFASetup} />
            <Route path="/dashboard" render={() => (
              isAuthenticated ? (
                userRole === 'admin' ? <AdminDashboard /> : <Dashboard />
              ) : <Redirect to="/login" />
            )} />
            <Route path="/settings" render={() => (
              isAuthenticated ? <Settings /> : <Redirect to="/login" />
            )} />
          </Switch>
        </main>
      </div>
    </Router>
  );
};

export default App;

