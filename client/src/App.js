import React, { Fragment, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import MainPage from './components/layout/MainPage';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';
import PrivateRouteMP from './components/routing/PrivateRouteMP';
import AddProject from './components/projects/AddProject';
import Project from './components/projects/Project';
import './App.css';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if(localStorage.token) {
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Alert />
        <section className="container">
          <Switch>
            <PrivateRoute exact path="/" component={MainPage} />  
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <PrivateRouteMP exact path="/add-project" component={AddProject} />
            <PrivateRoute exact path="/projects/:id" component={Project} />  
          </Switch>
        </section>
      </Fragment>
    </Router>
  </Provider> 
)
}

export default App;
