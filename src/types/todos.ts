export interface Set {
  setId: number;
  isCompleted: boolean;
}

export interface Todo {
  todoId: number;
  exerciseName: string;
  sets: Set[];
}

export interface Todos {
  todos: Todo[];
}
