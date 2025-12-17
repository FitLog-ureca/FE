"use client";

import TodoItem from "@/components/todos/TodoItem";
import { useTodosByDate } from "@/lib/tanstack/query/todos";
import { useAppDispatch, useAppSelector } from "@/store/redux/hooks";
import { setTodosData } from "@/store/redux/features/todos/todoSlice";
import { GroupedTodo } from "@/types/todos";
import { useEffect, useMemo } from "react";

export default function TodosContainer() {
  const dispatch = useAppDispatch();
  const todosData = useAppSelector((state) => state.todos.data);
  const today = new Date().toISOString().split("T")[0];
  const { data: apiData, isLoading, error } = useTodosByDate(today);

  // API 데이터가 변경되면 Redux에 저장
  useEffect(() => {
    if (apiData) {
      dispatch(setTodosData(apiData));
    }
  }, [apiData, dispatch]);

  // Redux 상태를 운동별로 그룹화
  const groupedTodos = useMemo(() => {
    if (!todosData?.exercises) return [];

    const grouped = todosData.exercises.reduce((acc, exercise) => {
      const existing = acc.find(
        (item) => item.exerciseId === exercise.exerciseId
      );

      const setInfo = {
        todoId: exercise.todoId,
        setsNumber: exercise.setsNumber,
        repsTarget: exercise.repsTarget,
        weight: exercise.weight,
        restTime: exercise.restTime,
        isCompleted: exercise.isCompleted,
      };

      if (existing) {
        existing.sets.push(setInfo);
      } else {
        acc.push({
          exerciseId: exercise.exerciseId,
          exerciseName: exercise.exerciseName,
          sets: [setInfo],
        });
      }

      return acc;
    }, [] as GroupedTodo[]);

    // 각 운동의 세트를 번호순으로 정렬
    grouped.forEach((todo) => {
      todo.sets.sort((a, b) => a.setsNumber - b.setsNumber);
    });

    return grouped;
  }, [todosData?.exercises]);

  if (isLoading) {
    return (
      <div className="flex flex-col">
        <p className="mt-5 mb-3 text-center text-lg font-semibold">운동 목표</p>
        <div className="flex justify-center items-center min-h-40">
          <p className="text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col">
        <p className="mt-5 mb-3 text-center text-lg font-semibold">운동 목표</p>
        <div className="flex justify-center items-center min-h-40">
          <p className="text-red-500">데이터를 불러오는데 실패했습니다.</p>
        </div>
      </div>
    );
  }

  if (!groupedTodos.length) {
    return (
      <div className="flex flex-col">
        <p className="mt-5 mb-3 text-center text-lg font-semibold">운동 목표</p>
        <div className="flex justify-center items-center min-h-40">
          <p className="text-gray-500">오늘 계획된 운동이 없습니다.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <p className="mt-5 mb-3 text-center text-lg font-semibold">운동 목표</p>

      <div className="pb-4">
        {groupedTodos.map((todo) => (
          <TodoItem
            key={todo.exerciseId}
            exerciseId={todo.exerciseId}
            exerciseName={todo.exerciseName}
            sets={todo.sets}
          />
        ))}
      </div>
    </div>
  );
}
