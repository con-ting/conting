export default function formatSido(address: string) {
  // hall_address의 앞 두글자 추출
  // 예시) hall_address: 서울특별시 송파구 올림픽로 25 (잠실동)
  // formated = 서울
  const formated = address.slice(0, 2);

  return formated;
}
