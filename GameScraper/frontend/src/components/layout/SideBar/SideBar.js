import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faGamepad } from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import useReactRouter from "use-react-router";

const SideBar = ({ isOpen, toggle }) => {
  const { history } = useReactRouter();
  const handleOnClickXbox = (e) => {
    e.preventDefault();
    history.push(`/filtered/xbox`);
  };

  return (
    <div className={classNames("sidebar", { "is-open": isOpen })}>
      <div className="sidebar-header">
        <span color="info" onClick={toggle} style={{ color: "#fff" }}>
          &times;
        </span>
        <h3>Game Scraper</h3>
      </div>
      <div className="side-menu">
        <Nav vertical className="list-unstyled pb-3">
          <NavItem>
            <NavLink tag={Link} to={"/"}>
              <FontAwesomeIcon icon={faHome} className="mr-2" />
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/filtered/MyGames`} replace>
              <FontAwesomeIcon icon={faGamepad} className="mr-2" />
              My Games
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/filtered/PS4`} replace>
              <FontAwesomeIcon icon={faGamepad} className="mr-2" />
              PS4
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/filtered/XboxOne`} replace>
              <FontAwesomeIcon icon={faGamepad} className="mr-2" />
              Xbox
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink tag={Link} to={`/filtered/Nintendo`} replace>
              <FontAwesomeIcon icon={faGamepad} className="mr-2" />
              Switch
            </NavLink>
          </NavItem>
        </Nav>
      </div>
    </div>
  );
};

export default SideBar;
