import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ToDo from "./ToDo";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
} from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#FFA000] to-[#FDD835]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-transparent text-center bg-clip-text bg-gradient-to-br from-orange-700 to-yellow-400  p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border rounded-3xl p-4 ml-2 bg-amber-500 text-slate-600`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //Create todo
  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Es können keine leeren felder hinzugefügt werden!");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  //Read todo from Firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe;
  }, []);

  //Update todo from Firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  //Delete toDo from Firebase

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Firebase ToDo</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Füge eine Aufgabe hinzu..."
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <ToDo key={index} todo={todo} toggleComplete={toggleComplete} />
          ))}
        </ul>

        {todos.length < 1 ? null : (
          <p className={style.count}>{`Offene Aufgaben: ${todos.length}`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
