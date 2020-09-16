import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { Register } from "./accounts/Register";
import { Login, Test } from "./accounts/Login";
import UnNavbar from "./layout/UnNavbar";
import { Provider } from "react-redux";
import store from "../store";
import PrivateRoute from "./common/PrivateRoute";
import { login } from "../actions/auth";
import { loadUser } from "../actions/auth";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Fragment>
            <UnNavbar />
            <div className="container">
              <Switch>
                <PrivateRoute exact path="/" component={Test} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
