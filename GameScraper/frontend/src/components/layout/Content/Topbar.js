import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAlignLeft } from "@fortawesome/free-solid-svg-icons";
import {
  Navbar,
  Button,
  NavbarToggler,
  Collapse,
  Nav,
  NavItem,
} from "reactstrap";
import { connect } from "react-redux";
import { logout } from "../../../actions/auth";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const Topbar = ({ toggleSidebar, auth, logout }) => {
  const [topbarIsOpen, setTopbarOpen] = useState(true);
  const toggleTopbar = () => setTopbarOpen(!topbarIsOpen);

  const conditionalAuthDisplay = () => {
    if (auth.isAuthenticated) {
      return (
        <NavItem>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <span className="navbar-text mr-3">
              <strong>
                {auth.user ? `Welcome ${auth.user.username}` : ""}
              </strong>
            </span>
            <li className="nav-item">
              <button
                onClick={logout}
                className="nav-link btn btn-info btn-sm text-light"
              >
                Logout
              </button>
            </li>
          </ul>
        </NavItem>
      );
    } else {
      return (
        <>
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <NavItem>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </NavItem>
            </li>
            <li className="nav-item">
              <NavItem>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </NavItem>
            </li>
          </ul>
        </>
      );
    }
  };

  return (
    <Navbar
      color="light"
      light
      className="navbar shadow-sm p-3 mb-5 bg-white rounded topbar sticky"
      expand="md"
    >
      {auth.isAuthenticated ? (
        <div>
          <Button color="info" onClick={toggleSidebar}>
            <FontAwesomeIcon icon={faAlignLeft} />
          </Button>
          <NavbarToggler onClick={toggleTopbar} />
        </div>
      ) : (
        <></>
      )}

      <Collapse isOpen={topbarIsOpen} navbar>
        <Nav className="ml-auto" navbar>
          {conditionalAuthDisplay()}
        </Nav>
      </Collapse>
    </Navbar>
  );
};

Topbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
export default connect(mapStateToProps, { logout })(Topbar);
