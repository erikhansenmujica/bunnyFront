import { SET_TASKS } from "../constants";

const defaultState = {
  tasks: [],
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TASKS:
      return { ...state, tasks: action.payload.reverse() };
    default:
      return state;
  }
}
