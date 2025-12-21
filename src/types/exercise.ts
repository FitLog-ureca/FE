export interface ExerciseItem {
  todoId: number;
  workoutId: number;
  exerciseId: number;
  exerciseName: string;
  setsNumber: number;
  repsTarget: number;
  weight: number | null;
  restTime: number | null;
  isCompleted: boolean;
  caloriesPerRep?: number;
  burnedCalories: number | null;
}

export interface ExerciseResponse {
  date: string;
  isDone: boolean;
  exercises: ExerciseItem[];
  totalCalories: number;
  message: string;
}

/** 운동 기록 화면 types (RecordList 컴포넌트 쪽) */
export interface TodoSetRecord {
  todoId: number;
  setsNumber: number;
  repsTarget: number;
  weight: number;
  isCompleted: boolean;
}

export interface ExerciseRecord {
  workoutId: number;
  exerciseId: number;
  exerciseName: string;
  burnedCalories: number | null;
  sets: TodoSetRecord[];
}
