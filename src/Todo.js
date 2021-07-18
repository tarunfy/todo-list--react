import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import "./todo.css";

function Todo({ todo }) {
  return (
    <List className="todo-list">
      <ListItem>
        <ListItemText primary={`➜ ${todo}`} />
      </ListItem>
    </List>
  );
}

export default Todo;
