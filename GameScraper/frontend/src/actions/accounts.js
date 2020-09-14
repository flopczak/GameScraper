import axios from "axios";

import { GET_ACCOUNTS, DELETE_ACCOUNT, ADD_ACCOUNT } from "./types";

//get Accounts
export const getAccounts = () => (dispath) => {
  axios
    .get("/api/accounts/")
    .then((res) => {
      dispath({
        type: GET_ACCOUNTS,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};

export const deleteAccount = (id) => (dispath) => {
  axios
    .delete(`/api/accounts/${id}/`)
    .then((res) => {
      dispath({
        type: DELETE_ACCOUNT,
        payload: id,
      });
    })
    .catch((err) => console.log(err));
};

export const addAccount = (account) => (dispath) => {
  axios
    .post(`/api/accounts/`, account)
    .then((res) => {
      dispath({
        type: ADD_ACCOUNT,
        payload: res.data,
      });
    })
    .catch((err) => console.log(err));
};
