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

  const date = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  const [
    { value: weekday },
    ,
    { value: month },
    ,
    { value: day },
    ,
    { value: year },
    ,
    { value: hour },
    ,
    { value: minute },
    ,
    { value: second },
    ,
    { value: dayPeriod },
  ] = dateTimeFormat.formatToParts(date);

  return (
    <div>
      <div className="text-white">
        {weekday}
        {}
      </div>
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
