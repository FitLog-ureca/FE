// 공통 쿼리 키 보관

export const QUERY_KEYS = {
  // 아래는 예시
  //   todo: {
  //     all: ["todo"], // todo 와 관련도니 모든 캐시 데이터 무효화 가능
  //     list: ["todo", "list"], // todo list의 캐시 데이터 무효화
  //     detail: (id: string) => ["todo", "detail", id], // 이 id를 갖는 단 하나의 todo 데이터만 무효화 가능
  //   },
};
