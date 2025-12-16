"use client";

import TodoItem from "@/components/todos/TodoItem";
import { setTodos } from "@/store/redux/features/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { useEffect } from "react";

const mockData = [
  {
    todoId: 1,
    exerciseName: "스쿼트",
    sets: [
      { setId: 1, isCompleted: true },
      { setId: 2, isCompleted: false },
      { setId: 3, isCompleted: false },
    ],
  },
  {
    todoId: 2,
    exerciseName: "벤치프레스",
    sets: [
      { setId: 1, isCompleted: false },
      { setId: 2, isCompleted: false },
    ],
  },
  {
    todoId: 3,
    exerciseName: "스쿼트",
    sets: [
      { setId: 1, isCompleted: false },
      { setId: 2, isCompleted: false },
      { setId: 3, isCompleted: false },
    ],
  },
  {
    todoId: 4,
    exerciseName: "벤치프레스",
    sets: [
      { setId: 1, isCompleted: false },
      { setId: 2, isCompleted: false },
    ],
  },
  {
    todoId: 5,
    exerciseName: "벤치프레스",
    sets: [
      { setId: 1, isCompleted: false },
      { setId: 2, isCompleted: false },
      { setId: 3, isCompleted: false },
    ],
  },
  {
    todoId: 6,
    exerciseName: "스쿼트",
    sets: [
      { setId: 1, isCompleted: false },
      { setId: 2, isCompleted: false },
      { setId: 3, isCompleted: false },
    ],
  },
];

export default function TodosContainer() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector((state) => state.todos.todos);

  useEffect(() => {
    dispatch(setTodos(mockData));
  }, [dispatch]);

  return (
    <div className="flex flex-col">
      <p className="mt-5 mb-3 text-center text-lg font-semibold">운동 목표</p>

      <div className="pb-4">
        {todos.map((todo) => (
          <TodoItem
            key={todo.todoId}
            todoId={todo.todoId}
            exerciseName={todo.exerciseName}
            sets={todo.sets}
          />
        ))}
      </div>
    </div>
  );
}
