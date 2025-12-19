export interface ExerciseSearchParams {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface ExerciseSearchItem {
  exerciseId: number;
  name: string;
  defaultCaloriesPerSet: number;
  unit: string;
}

export interface ExerciseSearchResponse {
  page: number;
  size: number;
  totalCount: number;
  totalPages: number;
  exercises: ExerciseSearchItem[];
}
