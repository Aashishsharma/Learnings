import React from "react";

export const todoList = ["ABC", "PQR"];
import Todoform from "./todoform";
function page() {
  console.table(todoList);
  return (
    <div>
      About page
      <Todoform />
      <p>Rendering todo</p>
      <ol>
        {todoList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ol>
    </div>
  );
}

export default page;
