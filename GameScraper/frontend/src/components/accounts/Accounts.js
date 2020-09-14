import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getAccounts, deleteAccount } from "../../actions/accounts";

export class Accounts extends Component {
  static propTypes = {
    accounts: PropTypes.array.isRequired,
    getAccounts: PropTypes.func.isRequired,
    deleteAccount: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.getAccounts();
  }

  render() {
    return (
      <div>
        <Fragment>
          <h2>Acc</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {this.props.accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.name}</td>
                  <td>{account.email}</td>
                  <td>{account.message}</td>
                  <td>
                    <button
                      onClick={this.props.deleteAccount.bind(this, account.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Fragment>
        <h1>Accounts</h1>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  accounts: state.accounts.accounts,
});

export default connect(mapStateToProps, { getAccounts, deleteAccount })(
  Accounts
);
