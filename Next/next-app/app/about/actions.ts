"use server";
import { revalidatePath } from "next/cache";

import { todoList } from "./page";

export const addTodo = async (formData: FormData) => {
  "use server";
  console.log({ formData });

  const todo = formData.get("todo") as string;
  console.log({ todo });
  todoList.push(todo);

  revalidatePath("/about");
};
