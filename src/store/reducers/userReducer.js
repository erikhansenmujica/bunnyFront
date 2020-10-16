import { SET_USERS, SET_USER } from "../constants";

const defaultState = {
  users: [],
  user: {},
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_USERS:
      return { ...state, users: action.payload.reverse() };
    case SET_USER:
      return { ...state, user: action.payload[0] };
    default:
      return state;
  }
}
