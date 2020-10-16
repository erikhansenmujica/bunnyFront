import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

export default ({ users, onClick, tasks, handleOpen, handleSingleUser }) => {
  return (
    <div className="listContainer">
      {users &&
        users.map((user, i) => {
          return (
            <div className="userContainer" key={i}>
              <div
                style={{ cursor: "pointer" }}
                onClick={() => handleSingleUser(user.id)}
              >
                {user.name}
              </div>
              <div>
                <AiFillEdit
                  className="icon edit"
                  onClick={() => handleOpen("user", user)}
                ></AiFillEdit>

                <AiFillDelete
                  className="icon delete"
                  onClick={() => onClick("delete", user.id)}
                ></AiFillDelete>
              </div>
            </div>
          );
        })}
      {tasks &&
        tasks.map((task, i) => {
          return (
            <div className="userContainer" key={i}>
              <div className="dataContainer">
                <h3>{task.name}</h3>
                <p>{task.description}</p>
                <div
                  style={{ color: task.state === "To do" ? "red" : "green" }}
                >
                  {task.state}
                </div>
              </div>
              <div className="buttonsCont">
                <AiFillEdit
                  className="icon edit"
                  onClick={() => handleOpen("task", task)}
                ></AiFillEdit>

                <AiFillDelete
                  className="icon delete"
                  onClick={() => onClick("delete", task.id, true)}
                ></AiFillDelete>
              </div>
            </div>
          );
        })}
    </div>
  );
};
