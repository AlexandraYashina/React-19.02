import React, { useState, useEffect } from "react";
import axios from 'axios';

const Todo = props => {
  const [todoName, setTodoName] = useState("");
  const [todoList, setTodoList] = useState([]);
  // const [todoState, setTodoState] = useState({ userInput: "", todoList: [] });
  

  const inputChangeHandler = event => {
    // setTodoState({
    //   userInput: event.target.value,
    //   todoList: todoState.todoList
    // });
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    // setTodoState({
    //   userInput: todoState.userInput,
    //   todoList: todoState.todoList.concat(todoState.userInput)
    // });
    setTodoList(todoList.concat(todoName));
    axios.post('https://test-78fa8.firebaseio.com/todos.json', {name: todoName})
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
  };

  useEffect(() => {
    axios.get('https://test-78fa8.firebaseio.com/todos.json').then(result => {
      const todoData = result.data;
      console.log(result);
      const todos = [];
      for (let key in todoData) {
        todos.push({id: key, name: todoData[key].name})
      }
      setTodoList(todos);
    });

    return () => {
      console.log('cleanup');
    };
  }, []);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  }

  useEffect(() => {
    document.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
    }
  }, []);


  return (
    <>
      <input
        type="text"
        placeholder="Todo"
        onChange={inputChangeHandler}
        value={todoName}
      />
      <button type="button" onClick={todoAddHandler}>
        Add
      </button>
      <ul>
        {todoList.map(todo => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;