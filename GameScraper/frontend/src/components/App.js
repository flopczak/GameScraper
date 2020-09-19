import React, { Fragment, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router } from "react-router-dom";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import Content from "./layout/Content/Content";
import "./App.css";

const App = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  useEffect(() => {
    store.dispatch(loadUser());
  });

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <div className="App wrapper">
            <Content
              toggleSidebar={toggleSidebar}
              sidebarIsOpen={sidebarIsOpen}
            />
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
