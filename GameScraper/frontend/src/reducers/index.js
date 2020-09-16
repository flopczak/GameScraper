import { combineReducers } from "redux";
import accounts from "./accounts";
import auth from "./auth";

export default combineReducers({
  accounts,
  auth,
});
