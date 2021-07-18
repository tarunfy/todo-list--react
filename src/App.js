import React, { useState, useEffect } from "react";
import { Button, FormControl, Input, InputLabel } from "@material-ui/core";
import "./App.css";
import Todo from "./Todo";
import db from "./firebase";
import firebase from "firebase";
import photo from "../src/img/bhatsapp.png";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // when the app loads, we want to fetch the data back from the database as they get added/removed:
  useEffect(() => {
    // this code here will run when app loads:
    db.collection("todos")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setTodos(
          snapshot.docs.map((doc) => {
            return { id: doc.id, todo: doc.data().todo };
          })
        );
      });
  }, []);

  const addTodo = (e) => {
    e.preventDefault();

    db.collection("todos").add({
      todo: input,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setTodos([...todos, input]);
    setInput("");
  };
  return (
    <div className="App">
      <div className="header">
        <h1>Bhatsapp </h1>
        <img src={photo} alt="logo" height="40px" width="40px" />
      </div>
      <form>
        <FormControl>
          <InputLabel className="text-white">✏ Type a message</InputLabel>
          <Input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></Input>
        </FormControl>
        <Button
          variant="outlined"
          color="primary"
          type="submit"
          onClick={addTodo}
          disabled={!input}
        >
          Send
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
