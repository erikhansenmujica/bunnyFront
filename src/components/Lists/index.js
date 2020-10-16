import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import List from "./List";
import { fetchUsers, deleteUser, createUser } from "../../store/actions/users";
import { createTask, fetchTasks, deleteTask } from "../../store/actions/tasks";

export default ({ handleOpen, view, handleSingleUser, singleUser }) => {
  const [name, setName] = useState("");
  const [placeholder, setPlaceholder] = useState("Insert user name");
  const users = useSelector((state) => state.userReducer.users);
  const user = useSelector((state) => state.userReducer.user);
  const tasks = useSelector((state) => state.taskReducer.tasks);
  console.log(tasks);
  const [newTask, setNewTask] = useState({
    name: "",
    description: "",
    state: "To do",
  });
  const dispatch = useDispatch();
  useEffect(() => {
    !tasks.length && singleUser.id && dispatch(fetchTasks(singleUser.id));
    !users.length && dispatch(fetchUsers());
  }, [user]);
  const onClick = (option, id, task) => {
    if (option === "create" && task) dispatch(createTask(newTask, id));
    else if (option === "delete" && task)
      dispatch(deleteTask(id, singleUser.id));
    else if (option === "delete") dispatch(deleteUser(id));
    else if (option === "create") {
      name ? dispatch(createUser(name)) : setPlaceholder("Please enter a name");
    }
    setNewTask({ name: "", description: "", state: "To do" });
    setName("");
  };
  const onChange = (e, task) => {
    if (task) {
      setNewTask({ ...newTask, [e.target.name]: e.target.value });
    }
    setName(e.target.value);
  };

  return (
    <div>
      {view === "users" ? (
        <div>
          <div className="addUserMiniForm">
            <input
              placeholder={placeholder}
              onChange={onChange}
              name="name"
              value={name}
            ></input>

            <div className="addButton" onClick={() => onClick("create")}>
              Add User
            </div>
          </div>
          <p style={{ marginBottom: "15px" }}>(scroll to see al users)</p>
          <List
            users={users}
            onClick={onClick}
            handleOpen={handleOpen}
            handleSingleUser={handleSingleUser}
          />
        </div>
      ) : (
        <div>
          <form className="addTaskMiniForm">
            <input
              placeholder="Name"
              value={newTask.name}
              name="name"
              onChange={(e) => onChange(e, true)}
            ></input>
            <input
              placeholder="Description"
              value={newTask.description}
              onChange={(e) => onChange(e, true)}
              name="description"
            ></input>
            <select
              placeholder="State"
              value={newTask.state}
              onChange={(e) => onChange(e, true)}
              name="state"
            >
              <option>To do</option>
              <option>Done</option>
            </select>
            <div
              className="addButton"
              onClick={() => onClick("create", singleUser.id, true)}
            >
              Add Task
            </div>
          </form>
          <p style={{ marginBottom: "15px" }}>
            ({singleUser.name + "'s" + " tasks"})
          </p>
          <List
            onClick={onClick}
            handleOpen={handleOpen}
            handleSingleUser={handleSingleUser}
            tasks={tasks}
          />
        </div>
      )}
    </div>
  );
};
