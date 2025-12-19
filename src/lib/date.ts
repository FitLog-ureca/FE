/* 메인화면에서 RIGHT 화면 렌더링 분기 조건에 사용되는 함수 */
export function isToday(date: string) {
  const today = new Date();
  const target = new Date(date);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return today.getTime() === target.getTime();
}

export function isPast(date: string) {
  const today = new Date();
  const target = new Date(date);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return target.getTime() < today.getTime();
}

export function isFuture(date: string) {
  const today = new Date();
  const target = new Date(date);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  return target.getTime() > today.getTime();
}
