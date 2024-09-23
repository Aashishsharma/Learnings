"use client";
import React from "react";
import { addTodo } from "./actions";
import { useFormStatus } from "react-dom";
function Todoform() {
  // use form status to get the pending state
  const { pending } = useFormStatus();
  const firstValidateThenCallServerAction = async (formData: FormData) => {
    // here we can validate from
    // and use StateState to show any validation errors on UI
    console.log("form data");
    try {
      await addTodo(formData);
    } catch (err) {
      console.log(err); // show error on UI
    }
  };
  return (
    <div>
      <form action={(formData) => firstValidateThenCallServerAction(formData)}>
        <label>Enter todo</label>
        <input name="todo" type="text"></input>
        <button type="submit">Submit</button>
        <p>{pending}</p>
        {/* use the pending for loading purposes */}
        {pending ? "Adding todo" : "Todo Added"}
        <br></br>
      </form>
    </div>
  );
}

export default Todoform;
