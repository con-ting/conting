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
