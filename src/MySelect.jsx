import { useState } from "react";

export function MySelect() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setTodos([...todos, newTodo]);
    setNewTodo("");
    console.log(todos, "todos");
    console.log(newTodo, "newtodos");
  };

  // const handleDelete = (index) => {
  //   setTodos(todos.filter((_, i) => i !== index));
  // };

  function handleDelete(index) {
    const newData = [...todos];
    newData.splice(index, 1);
    setTodos(newData);
  }

  return (
    <div>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newTodo}
          onChange={(event) => setNewTodo(event.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
      <ul className="text-white">
        {todos?.map((todo, index) => (
          <li key={index}>
            {todo}{" "}
            <button type="button" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
