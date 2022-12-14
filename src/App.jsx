import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import ToDo from "./ToDo";
import { db } from "./firebase";
import { query, collection, onSnapshot } from "firebase/firestore";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ed] to-[#1cb5e0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-transparent text-center bg-clip-text bg-gradient-to-br from-orange-700 to-yellow-400  p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border rounded-3xl p-4 ml-2 bg-orange-400 text-slate-100`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);

  //Create toDo
  //Read toDo from Firebase
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
  //Update toDo from Firebase
  //Delete toDo from Firebase

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Firebase ToDo</h3>
        <form className={style.form}>
          <input className={style.input} type="text" placeholder="Add ToDo" />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <ToDo key={index} todo={todo} />
          ))}
        </ul>
        <p className={style.count}>Du hast noch 3 sachen zu erledigen</p>
      </div>
    </div>
  );
}

export default App;
