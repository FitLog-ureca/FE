export interface Timer {
  isActive: boolean;
  duration: number; // 초
  todoId: number | null;
}

export interface RestTimeParams {
  todoId: number;
  restTime: number;
}
