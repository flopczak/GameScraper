import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route } from "react-router-dom";
import PrivateRoute from "../../common/PrivateRoute";
import Register from "../../accounts/Register";
import Login from "../../accounts/Login";
import MainGamesView from "../../funcionality/MainGamesView";
import FilteredGamesView from "../../funcionality/FilteredGamesView";
import SideBar from "../SideBar/SideBar";
import CardView from "../../funcionality/CardView";
import MyGames from "../../funcionality/MyGames";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import Topbar from "./Topbar";
import { StyledTopBar } from "./StyledTopBar";

const Content = ({ sidebarIsOpen, toggleSidebar, auth }) => {
  return (
    <>
      {auth.isAuthenticated ? (
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
      ) : null}

      <Container
        fluid
        className={classNames("content", { "is-open": sidebarIsOpen })}
      >
        <StyledTopBar sidebarIsOpen={sidebarIsOpen}>
          <Topbar toggleSidebar={toggleSidebar} />
        </StyledTopBar>
        <Switch>
          <PrivateRoute exact path="/" component={FilteredGamesView} />
          <PrivateRoute exact path="/cardview/:id" exact component={CardView} />
          <PrivateRoute path="/filtered/MyGames" component={MyGames} />
          <PrivateRoute path="/filtered/:id" component={FilteredGamesView} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </Container>
    </>
  );
};

Content.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Content);
