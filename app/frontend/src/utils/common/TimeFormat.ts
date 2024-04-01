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
export function korDateFormatString(input: Date | string): string {
  let date: Date;
  if (typeof input === 'string') {
    // 문자열 입력 처리
    date = new Date(input);
  } else {
    // Date 객체 입력 처리
    date = input;
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth()는 0부터 시작하므로 1을 더해줍니다.
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const dayOfWeek = days[date.getDay()];

  if (typeof input === 'string' && input.includes('T')) {
    // 로컬 날짜 시간 문자열일 경우
    return `${year}.${month.toString().padStart(2, '0')}.${day
      .toString()
      .padStart(2, '0')}(${dayOfWeek}) ${hours
      .toString()
      .padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  } else {
    // 날짜만 있는 경우
    return `${year}년 ${month}월 ${day}일`;
  }
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

export function getDifferenceInMinutes(
  dateTime_1: string,
  dateTime_2: string,
): number {
  const date1 = new Date(dateTime_1);
  const date2 = new Date(dateTime_2);

  const difference = date2.getTime() - date1.getTime();

  // 밀리초 차이를 분으로 변환 (1000 밀리초 = 1초, 60초 = 1분)
  return difference / (1000 * 60);
}

export function isReservationAvailable(inputDateString: string): boolean {
  // 현재 날짜를 가져와서 시간을 00:00:00으로 설정합니다.
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // 입력된 'LocalDate' 형식의 문자열을 Date 객체로 변환합니다.
  const inputDate = new Date(inputDateString);

  // 날짜 비교
  if (inputDate < currentDate) {
    return true;
  } else if (inputDate.getTime() === currentDate.getTime()) {
    return false;
  } else {
    return false;
  }
}
