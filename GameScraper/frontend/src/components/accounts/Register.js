import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
} from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import store from "../../store";
import styled from "styled-components";

const RegisterStyled = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column;
  width: 35%;
  height: auto;
  margin: 0 auto;
  border: 2px solid #000;
  border-radius: 20px;
  background: #eee;
`;

const ErrPass = styled.div`
  color: red;
`;

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [passMatch, setPassMatch] = useState(true);
  const [flag, setFlag] = useState(false);

  const showError = () => {
    if (passMatch) {
      return <></>;
    } else {
      return <ErrPass>passwords dont match</ErrPass>;
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setPassMatch(false);
    } else {
      setPassMatch(true);
      const newUser = {
        username,
        password,
        email,
      };
      console.log("onsubmit register");
      store.dispatch(register(newUser));
    }
  };

  const redirect = () => {
    let temp = store.getState();
    if (temp.auth.isAuthenticated) {
      console.log("redirect", temp.auth.isAuthenticated);
      return <Redirect to="/" />;
    }
  };

  return (
    <>
      <div className="col-md-6 m-auto">
        <div className="card card-body mt-5">
          <h2 className="text-center">Register</h2>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                name="username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                name="password2"
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
              />
            </div>
            <div className="form-group">{showError()}</div>
            <div className="form-group">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
            </div>
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>
      {redirect()}
    </>
  );
};

Register.prototype = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
