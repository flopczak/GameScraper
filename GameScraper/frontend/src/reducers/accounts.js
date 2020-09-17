import { GET_ACCOUNTS, DELETE_ACCOUNT, ADD_ACCOUNT } from "../actions/types.js";

const initialState = {
  accounts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ACCOUNTS:
      return {
        ...state,
        accounts: action.payload,
      };
    case DELETE_ACCOUNT:
      return {
        ...state,
        accounts: state.accounts.filter(
          (account) => account.id !== action.payload
        ),
      };
    case ADD_ACCOUNT:
      return {
        ...state,
        accounts: [...state.accounts, action.payload],
      };

    default:
      return state;
  }
}
