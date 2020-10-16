import axios from "axios";

import { SET_TASKS } from "../constants";

const setTasks = (payload) => ({
  type: SET_TASKS,
  payload,
});

export const fetchTasks = (userId) => (dispatch) =>
  axios
    .get(`http://localhost:3002/tasks/${userId}`)
    .then((res) => dispatch(setTasks(res.data)));

export const deleteTask = (id, userId) => (dispatch) =>
  axios
    .delete(`http://localhost:3002/tasks/${id}/${userId}`)
    .then((res) => dispatch(setTasks(res.data)));

export const updateTask = (task, userId) => (dispatch) =>
  axios
    .put(`http://localhost:3002/tasks/${userId}`, task)
    .then((res) => dispatch(setTasks(res.data)));

export const createTask = (body, userId) => (dispatch) =>
  axios
    .post(`http://localhost:3002/tasks/create/${userId}`, body)
    .then((res) => dispatch(setTasks(res.data)));
