import axios from "axios";

import { SET_USERS, SET_USER } from "../constants";

const setUsers = (payload) => ({
  type: SET_USERS,
  payload,
});
const setUser = (payload) => ({
  type: SET_USER,
  payload,
});

export const fetchUsers = () => (dispatch) =>
  axios
    .get("http://localhost:3001/users")
    .then((res) => dispatch(setUsers(res.data)));

export const fetchUser = (id) => (dispatch) =>
  axios
    .get(`http://localhost:3001/users/${id}`)
    .then((res) => dispatch(setUser(res.data)));

export const deleteUser = (id) => (dispatch) =>
  axios
    .delete(`http://localhost:3001/users/${id}`)
    .then((res) => dispatch(setUsers(res.data)));

export const updateUser = (user) => (dispatch) =>
  axios
    .put(`http://localhost:3001/users/`, user)
    .then((res) => dispatch(setUsers(res.data)));
export const createUser = (name) => (dispatch) =>
  axios
    .post(`http://localhost:3001/users`, { name })
    .then((res) => dispatch(setUsers(res.data)));
