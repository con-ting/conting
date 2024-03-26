export function formatDateWithDay(dateString: string): string {
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  // "YYYY.MM.DD" 형식의 문자열을 Date 객체로 파싱
  const [year, month, day] = dateString.split('.');
  const date = new Date(`${year}-${month}-${day}`);

  // 요일 구하기
  const dayOfWeek = days[date.getDay()];

  // "YYYY.MM.DD(요일)" 형식의 문자열 반환
  return `${year}.${month}.${day}(${dayOfWeek})`;
}

export function korDateFormat(date: Date): string {
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return year + '년 ' + month + '월 ' + day + '일';
}

// 예제 사용
// const dateString = "2024.07.05";
// console.log(formatDateWithDay(dateString)); "2024.07.05(금)" 출력
// 날짜 문자열을 받아 YYYY-MM-DD 포맷으로 반환하는 함수
export function serverDateFormat(date: Date): string {
  const year = date.getFullYear();
  // 월과 일은 0부터 시작하므로 +1을 하고, 두 자리 숫자로 만들기 위해 `padStart()` 메서드 사용
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
