import { useState } from "react";
import { API } from "./data";
import { json } from "react-router-dom";

export function MySelect() {
  // const [todos, setTodos] = useState([]);
  // const [newTodo, setNewTodo] = useState("");

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   setTodos([...todos, newTodo]);
  //   setNewTodo("");
  // };

  // // const handleDelete = (index) => {
  // //   setTodos(todos.filter((_, i) => i !== index));
  // // };

  // function handleDelete(index) {
  //   const newData = [...todos];
  //   newData.splice(index, 1);
  //   setTodos(newData);
  // }

  // const date = new Date();
  // const options = {
  //   weekday: "long",
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  //   second: "numeric",
  //   hour12: true,
  // };
  // const dateTimeFormat = new Intl.DateTimeFormat("en-US", options);
  // const [
  //   { value: weekday },
  //   ,
  //   { value: month },
  //   ,
  //   { value: day },
  //   ,
  //   { value: year },
  //   ,
  //   { value: hour },
  //   ,
  //   { value: minute },
  //   ,
  //   { value: second },
  //   ,
  //   { value: dayPeriod },
  // ] = dateTimeFormat.formatToParts(date);
  const [file, setfile] = useState(null);
  const [name, setname] = useState("");

  async function onsubmitfun(e) {
    e.preventDefault();

    const formdata = new FormData();
    // formdata.append("name", name);
    formdata.append("file", file);

    await fetch(`${API}/uploading/img`, {
      method: "POST",
      body: formdata,
    }).then((data) => data.json() )
    .then((data) => console.log(data) )
  }

  function handlechange(e) {
    setfile(e.target.files);
  }

  function handlechangename(e) {
    setname(e.target.value);
  }

  const postimg = async (data) => {};

  return (
    <div>
      <form onSubmit={onsubmitfun}>
        <h1 className="text-white">image upload</h1>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label">
            Default file input example
          </label>
          <input
            onChange={handlechange}
            className="form-control"
            type="file"
            id="formFile"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <input
            onChange={handlechangename}
            className="form-control"
            type="text"
            id="name"
          />
        </div>

        <button type="submit">sumbit</button>
      </form>
      {/* <div className="text-white">
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
      </ul> */}
    </div>
  );
}
