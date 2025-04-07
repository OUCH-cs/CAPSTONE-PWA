/**
 * 배열을 일정 크기(`size`)로 나누어 2차원 배열로 반환하는 유틸 함수
 * 자가진단 증상 리스트들을 일정크기로 나누어 보여주기 위해 작성
 * 예: ['a', 'b', 'c', 'd'], size = 2 → [['a', 'b'], ['c', 'd']]
 *
 * @param arr - 나눌 대상 배열
 * @param size - 한 그룹당 요소 개수
 * @returns string[][] - 쪼개진 배열 그룹
 */

export const chunkArray = (arr: string[], size: number) => {
    return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
      arr.slice(i * size, i * size + size)
    );
  };