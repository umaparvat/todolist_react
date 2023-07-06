import "./styles.css";
import React from "react";
export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Wash dishes", done: false },
    { id: 2, text: "Do laundry", done: false },
    { id: 3, text: "Take shower", done: false }
  ]);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList items={todos} setTodos={setTodos} />
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList({ items, setTodos }) {
  //console.log(items, items.length);
  const handleToggelTodo = (item) => {
    const updatedTodos = items.map((t) =>
      t.id === item.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  };

  if (!items.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul>
      {items.map((item) => (
        <li
          onDoubleClick={() => handleToggelTodo(item)}
          style={{ textDecoration: item.done ? "line-through" : "" }}
          key={item.id}
        >
          {item.text}
          <DeleteTodo todo={item} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function DeleteTodo({ todo, setTodos }) {
  const handleDeleteTodo = () => {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
    }
  };

  return (
    <span
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10
      }}
      onClick={handleDeleteTodo}
    >
      x
    </span>
  );
}

function AddTodo({ setTodos }) {
  const inputRef = React.useRef();
  const handleAddTdo = (event) => {
    event.preventDefault();
    const todo = {
      text: event.target.elements.addTodo.value,
      done: false
    };
    setTodos((prevTodos) => {
      todo["id"] = prevTodos.length + 1;
      console.log(todo);
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  };
  return (
    <form onSubmit={handleAddTdo}>
      <input name="addTodo" ref={inputRef} placeholder="Add todo" />
      <button type="submit">submit</button>
    </form>
  );
}
