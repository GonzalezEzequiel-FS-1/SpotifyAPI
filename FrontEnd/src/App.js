
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Switch>
                    <Route path="/signin" component={SignIn} />
                    <Route path="/signup" component={SignUp} />
                    <PrivateRoute path="/home" component={Home} />
                    {/* Add more private routes as needed */}
                </Switch>
            </Router>
        </AuthProvider>
    );
};

export default App;