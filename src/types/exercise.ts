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
  burnedCalories?: number;
}

export interface ExerciseResponse {
  date: string;
  isDone: boolean;
  exercises: ExerciseItem[];
  totalCalories: number;
  message: string;
}
