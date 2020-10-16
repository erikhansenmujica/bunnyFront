import React, { useState, useEffect } from "react";
import "./App.css";
import Lists from "./components/Lists";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { Button } from "@material-ui/core";
import { updateUser } from "./store/actions/users";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "./store/actions/users";
import { updateTask } from "./store/actions/tasks";
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: "#282c34",
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    color: "white",
    height: "40vh",
    width: "30vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: {
    marginBottom: "20px",
  },
}));

function App() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({ name: "", id: null });
  const singleUser = useSelector((state) => state.userReducer.user);
  const [task, setTask] = useState({
    id: null,
    name: "",
    description: "",
    state: "",
  });
  const [view, setView] = useState("users");
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState("");
  const handleOpen = (type, data) => {
    console.log(data);
    setUpdate(type);
    if (type === "user") setUser(data);
    else setTask(data);
    setOpen(true);
  };
  const userOnChange = (e) => {
    setUser({ ...user, name: e.target.value });
  };
  const taskOnChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleSubmit = (what) => {
    if ("user") dispatch(updateUser(user));
    if ("task") dispatch(updateTask(task, singleUser.id));
    handleClose();
  };
  const handleSingleUser = (id) => {
    dispatch(fetchUser(id));
    setView("user");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className={classes.title}>
          {view === "users" ? "Users" : singleUser.name}
        </h1>
        <Lists
          handleOpen={handleOpen}
          view={view}
          handleSingleUser={handleSingleUser}
          singleUser={singleUser}
        />
      </header>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title" style={{ fontSize: "35px" }}>
              Update {update}
            </h2>
            {update === "user" ? (
              <div className={classes.form}>
                <input
                  onChange={userOnChange}
                  placeholder={user.name}
                  defaultValue={user.name}
                  style={{ marginBottom: "70px" }}
                ></input>
                <Button
                  variant="outlined"
                  style={{
                    marginTop: "5px",
                    color: "white",
                    borderColor: "white",
                  }}
                  onClick={() => handleSubmit("user")}
                >
                  Submit
                </Button>
              </div>
            ) : (
              <form onChange={taskOnChange} className={classes.form}>
                <input name="name" defaultValue={task.name}></input>
                <input
                  name="description"
                  defaultValue={task.description}
                ></input>
                <select name="state" defaultValue={task.state}>
                  <option>To do</option>
                  <option>Done</option>
                </select>
                <Button
                  variant="outlined"
                  style={{
                    display: "block",
                    marginTop: "5px",
                    alignSelf: "center",
                    color: "white",
                    borderColor: "white",
                  }}
                  onClick={() => handleSubmit("task")}
                >
                  Submit
                </Button>
              </form>
            )}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default App;
