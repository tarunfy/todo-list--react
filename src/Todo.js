import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Modal,
  Input,
} from "@material-ui/core";
import "./todo.css";
import db from "./firebase";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo({ todo }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const handleClose = () => {
    setOpen(true);
  };
  const updateTodo = () => {
    // update the todo with the new input text:
    db.collection("todos").doc(todo.id).set({ todo: input }, { merge: true });
    setOpen(false);
    setInput("");
  };
  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <div className={`edit ${classes.paper}`}>
          <h1>Edit your message</h1>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={todo.todo}
          ></Input>
          <Button
            color="primary"
            className="update-btn"
            variant="contained"
            onClick={updateTodo}
          >
            Update Todo
          </Button>
        </div>
      </Modal>
      <List className="todo-list">
        <ListItem>
          <ListItemText primary={`➜ ${todo.todo}`} />
        </ListItem>
        <EditIcon onClick={(e) => setOpen(true)} className="green">
          Edit
        </EditIcon>
        <DeleteForeverIcon
          onClick={(e) => db.collection("todos").doc(todo.id).delete()}
          className="green"
        />
      </List>
    </>
  );
}

export default Todo;
