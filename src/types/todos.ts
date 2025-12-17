// 개별 row 타입
export interface TodoSetRowResponse {
  todoId: number;
  setsNumber: number;
  repsTarget: number;
  weight: number;
  restTime: number | null;
  isCompleted: boolean;
}

// /exercises의 exercises 응답값 타입
export interface TodoExercise extends TodoSetRowResponse {
  exerciseId: number;
  exerciseName: string;
  caloriesPerRep: number | null;
  burnedCalories: number | null;
}

// /exercises 응답값 타입
export interface TodoResponse {
  date: string;
  isDone: boolean;
  exercises: TodoExercise[];
  totalCalories: number;
  message: string;
}

// 컴포넌트에서 사용할 그룹화된 타입 -> 렌더링용
export interface GroupedTodo {
  exerciseId: number;
  exerciseName: string;
  sets: {
    todoId: number;
    setsNumber: number;
    repsTarget: number;
    weight: number;
    restTime: number | null;
    isCompleted: boolean;
  }[];
}
