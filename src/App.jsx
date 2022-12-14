import React from "react";
import { AiOutlinePlus } from "react-icons/ai";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ed] to-[#1cb5e0]`,
};

function App() {
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
        <ul></ul>
      </div>
    </div>
  );
}

export default App;
